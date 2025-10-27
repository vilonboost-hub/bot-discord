const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('garantia')
    .setDescription('🛡️ Asigna una garantía a un usuario por X días.')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('Usuario al que se le asignará la garantía.')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('dias')
        .setDescription('Cantidad de días de garantía.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const usuario = interaction.options.getUser('usuario');
    const dias = interaction.options.getInteger('dias');
    const guild = interaction.guild;

    const rolGarantiaId = '1432173906747199529'; // Rol de garantía
    const canalRegistroId = '1432174120807698526'; // Canal de registros

    const miembro = await guild.members.fetch(usuario.id).catch(() => null);
    if (!miembro) {
      return interaction.reply({ content: '❌ No se pudo encontrar al usuario en el servidor.', ephemeral: true });
    }

    // Asignar el rol
    await miembro.roles.add(rolGarantiaId);

    const ahora = new Date();
    const fechaInicio = ahora.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
    const fechaFin = new Date(ahora.getTime() + dias * 24 * 60 * 60 * 1000).toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

    // Embed de confirmación
    const embedConfirmacion = new EmbedBuilder()
      .setColor('#00b8ff')
      .setTitle('🛡️ Garantía asignada')
      .setDescription(
        `✅ Se ha asignado una garantía a **${usuario.username}** por **${dias} días**.\n\n` +
        `📅 **Inicio:** ${fechaInicio}\n` +
        `📅 **Finaliza:** ${fechaFin}`
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Sistema de garantías automático' })
      .setTimestamp();

    await interaction.reply({ embeds: [embedConfirmacion], ephemeral: false });

    // Registrar en el canal de logs
    const canalRegistro = guild.channels.cache.get(canalRegistroId);
    if (canalRegistro) {
      const embedRegistro = new EmbedBuilder()
        .setColor('#00ffcc')
        .setTitle('📋 Registro de garantía')
        .setDescription(
          `🧍‍♂️ Usuario: <@${usuario.id}>\n` +
          `⏱️ Días de garantía: **${dias}**\n` +
          `📅 **Inicio:** ${fechaInicio}\n` +
          `📅 **Fin programado:** ${fechaFin}\n` +
          `👤 Asignado por: ${interaction.user.tag}`
        )
        .setTimestamp();
      await canalRegistro.send({ embeds: [embedRegistro] });
    }

    // Programar la eliminación del rol
    setTimeout(async () => {
      const miembroActualizado = await guild.members.fetch(usuario.id).catch(() => null);
      if (miembroActualizado && miembroActualizado.roles.cache.has(rolGarantiaId)) {
        await miembroActualizado.roles.remove(rolGarantiaId);

        // Registrar la eliminación del rol
        const canalLog = guild.channels.cache.get(canalRegistroId);
        if (canalLog) {
          const embedFin = new EmbedBuilder()
            .setColor('#ff5555')
            .setTitle('🧾 Fin de garantía')
            .setDescription(
              `🚫 Se ha eliminado el rol de garantía a <@${usuario.id}>.\n\n` +
              `📅 Fecha de finalización: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}`
            )
            .setTimestamp();
          await canalLog.send({ embeds: [embedFin] });
        }
      }
    }, dias * 24 * 60 * 60 * 1000);
  }
};
