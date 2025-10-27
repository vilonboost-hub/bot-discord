const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('optimizacion')
    .setDescription('⚙️ Te da consejos para mejorar el rendimiento del PC.')
    .addStringOption(option =>
      option
        .setName('tipo')
        .setDescription('Tipo de optimización que buscas.')
        .setRequired(true)
        .addChoices(
          { name: '🎮 FPS en juegos', value: 'fps' },
          { name: '🌐 Internet / Ping', value: 'ping' },
          { name: '💻 Rendimiento general', value: 'rendimiento' }
        )
    ),

  async execute(interaction) {
    const tipo = interaction.options.getString('tipo');

    let descripcion = '';
    if (tipo === 'fps') {
      descripcion =
        '🎮 **Optimización de FPS**\n\n' +
        '• Cierra procesos innecesarios (Ctrl + Shift + Esc)\n' +
        '• Actualiza tus drivers GPU\n' +
        '• Desactiva GameDVR y Xbox Bar\n' +
        '• Usa un plan de energía alto rendimiento\n\n' +
        '💨 Mejora tu rendimiento aún más con **Optimizacion Premium de Vilon Boost** 🔧';
    } else if (tipo === 'ping') {
      descripcion =
        '🌐 **Optimización de Internet / Ping**\n\n' +
        '• Usa cable Ethernet si es posible\n' +
        '• Reinicia el router cada cierto tiempo\n' +
        '• Evita descargas mientras juegas\n' +
        '• Usa servidores cercanos\n\n' +
        '💡 Podemos ayudarte a reducir tu ping con una **configuración avanzada** personalizada.';
    } else {
      descripcion =
        '💻 **Optimización General del Sistema**\n\n' +
        '• Limpia el inicio de Windows (Administrador de tareas)\n' +
        '• Desactiva efectos visuales innecesarios\n' +
        '• Limpia archivos temporales (Win + R → temp)\n' +
        '• Mantén drivers y Windows actualizados\n\n' +
        '⚙️ Contrata nuestra **Optimización Premium** para un rendimiento máximo.';
    }

    const embed = new EmbedBuilder()
      .setColor('#00ffcc')
      .setTitle('⚙️ Consejos de Optimización')
      .setDescription(descripcion)
      .setFooter({ text: 'Vilon Boost © 2025 — Rendimiento garantizado 💨' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
