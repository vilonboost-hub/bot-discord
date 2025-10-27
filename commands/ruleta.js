const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} = require('discord.js');

// 🕒 Cooldown global (por usuario)
const cooldowns = new Map();

// 👑 Usuario VIP (sin cooldown)
const exemptUserId = '1057306102326370314';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ruleta')
    .setDescription('🎯 Prueba tu suerte en la ruleta de Vilon Boost.'),
  
  async execute(interaction) {
    const userId = interaction.user.id;
    const now = Date.now();

    // 🕒 Cooldown de 24h
    const cooldownTime = 24 * 60 * 60 * 1000;

    if (userId !== exemptUserId) {
      if (cooldowns.has(userId)) {
        const expirationTime = cooldowns.get(userId) + cooldownTime;
        if (now < expirationTime) {
          const remaining = expirationTime - now;
          const hours = Math.floor(remaining / (1000 * 60 * 60));
          const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
          return interaction.reply({
            content: `⏳ Ya usaste la ruleta. Podrás volver a jugar en **${hours}h ${minutes}m**.`,
            ephemeral: true
          });
        }
      }
    }

    // 📜 Embed inicial
    const embed = new EmbedBuilder()
      .setColor('#00ffcc')
      .setTitle('🎡 ¡Ruleta de Vilon Boost!')
      .setDescription(
        'Prueba tu suerte y gana increíbles premios <a:diamante:1431860957423992902>\n\n' +
        '**Posibles premios:**\n' +
        '🎁 Optimizacion Premium\n' +
        '🎬 Cuenta Streaming (Netflix, HBO, (preguntar si hay stock)\n' +
        '❌ Nada\n' +
        '💸 5% de descuento en toda la shop\n' +
        '💥 20% en toda la shop\n' +
        '🖥️ Optimizacion básica + Wallpaper Engine\n' +
        '🔥 50% en toda la shop\n\n' +
        'Pulsa **🎯 Girar** y descubre tu suerte...'
      )
      .setFooter({ text: 'Vilon Boost © 2025 — ¡Suerte!' });

    const boton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('girar')
        .setLabel('🎯 Girar')
        .setStyle(ButtonStyle.Success)
    );

    await interaction.reply({ embeds: [embed], components: [boton], ephemeral: false });

    // 🎯 Esperar interacción
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 30000
    });

    collector.on('collect', async (i) => {
      if (i.customId !== 'girar') return;
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: '❌ Solo quien usó el comando puede girar la ruleta.', ephemeral: true });

      // Guardar cooldown (excepto usuario VIP)
      if (userId !== exemptUserId) {
        cooldowns.set(userId, now);
      }

      // 🎰 Probabilidad
      const random = Math.random() * 100;
      let premio;

      if (random <= 2) premio = '🎬 **Cuenta Streaming (Netflix, HBO, etc)**';
      else if (random <= 4) premio = '🖥️ **Optimizacion básica + Wallpaper Engine Gratis**';
      else if (random <= 7) premio = '🎁 **Optimizacion Premium**';
      else if (random <= 10) premio = '🔥 **50% de descuento en toda la shop**';
      else if (random <= 20) premio = '💥 **20% de descuento en toda la shop**';
      else if (random <= 45) premio = '💸 **5% de descuento en toda la shop**';
      else premio = '❌ Nada... ¡Sigue intentando!';

      // 🎡 Embed resultado
      const resultEmbed = new EmbedBuilder()
        .setColor('#00e0b3')
        .setTitle('🎯 ¡La ruleta ha girado!')
        .setDescription(`El resultado es...\n\n${premio}`)
        .setFooter({ text: `Gracias por participar, ${interaction.user.username}! 💨` })
        .setTimestamp();

      await i.reply({ embeds: [resultEmbed], ephemeral: false });
    });
  }
};
