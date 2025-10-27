const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tos')
    .setDescription('📜 Muestra los Términos del Servicio y políticas de la tienda.'),

  async execute(interaction) {
    // 📜 Embed principal
    const mainEmbed = new EmbedBuilder()
      .setColor('#ffffff')
      .setTitle('📜 Términos del Servicio — Vilon Boost')
      .setDescription(
        'Por favor, ten en cuenta **toda esta información antes de realizar cualquier compra.** 💎\n\n' +
        'Al adquirir un producto o servicio, confirmas que has leído y aceptado las políticas de la tienda.\n\n' +
        'Selecciona una opción a continuación para ver más detalles:'
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Seguridad y confianza ante todo.' })
      .setTimestamp();

    // 🎛️ Botones
    const botones = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('faq')
        .setLabel('📘 FAQ')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('garantia')
        .setLabel('🛡️ Garantía')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('tos')
        .setLabel('📜 Términos')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({ embeds: [mainEmbed], components: [botones], ephemeral: false });

    // 🎯 Collector para manejar los botones
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 120000 // 2 minutos
    });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id)
        return i.reply({ content: '❌ Solo el usuario que usó el comando puede interactuar.', ephemeral: true });

      if (i.customId === 'faq') {
        const faqEmbed = new EmbedBuilder()
          .setColor('#00b8ff')
          .setTitle('📘 Preguntas Frecuentes — Vilon Boost')
          .setDescription(
            '❓ **¿Cuánto tardan los pedidos?**\nGeneralmente entre 5 y 30 minutos dependiendo del servicio.\n\n' +
            '❓ **¿Puedo pedir reembolso?**\nSolo en casos donde el servicio no haya sido entregado.\n\n' +
            '❓ **¿Cómo recibo mi producto?**\nPor mensaje directo o por canal privado del ticket.\n\n' +
            '❓ **¿Qué debo hacer si tengo un problema?**\nContacta con el soporte y te ayudaremos lo antes posible. 💬'
          )
          .setFooter({ text: 'Vilon Boost © 2025 — Preguntas frecuentes' })
          .setTimestamp();
        await i.update({ embeds: [faqEmbed], components: [botones] });
      }

      if (i.customId === 'garantia') {
        const garantiaEmbed = new EmbedBuilder()
          .setColor('#00e0b3')
          .setTitle('🛡️ Política de Garantía — Vilon Boost')
          .setDescription(
            '✅ Todos los servicios cuentan con garantía en caso de fallos durante el periodo indicado.\n\n' +
            '🔁 Si el servicio presenta algún problema dentro del tiempo de cobertura, será reemplazado o reparado sin costo.\n\n' +
            '⚠️ La garantía **no cubre mal uso, modificaciones o violación de las normas**.\n\n' +
            '💬 Ante cualquier duda, contacta con soporte inmediatamente.'
          )
          .setFooter({ text: 'Vilon Boost © 2025 — Garantía de satisfacción' })
          .setTimestamp();
        await i.update({ embeds: [garantiaEmbed], components: [botones] });
      }

      if (i.customId === 'tos') {
        const tosEmbed = new EmbedBuilder()
          .setColor('#ffffff')
          .setTitle('📜 Términos del Servicio — Detalles')
          .setDescription(
            '1️⃣ Todos los pagos son finales. **No se aceptan reembolsos una vez entregado el producto o servicio**.\n\n' +
            '2️⃣ Los servicios ofrecidos son digitales y se entregan dentro de los tiempos indicados.\n\n' +
            '3️⃣ El uso indebido o la distribución no autorizada de productos puede resultar en suspensión del acceso tanto del producto como del servidor.\n\n' +
            '4️⃣ La tienda **Vilon Boost** se reserva el derecho de modificar precios o servicios sin previo aviso.\n\n' +
            '💬 Ante cualquier duda, contacta al soporte oficial de Vilon Boost.'
          )
          .setFooter({ text: 'Vilon Boost © 2025 — Legal y transparencia' })
          .setTimestamp();
        await i.update({ embeds: [tosEmbed], components: [botones] });
      }
    });

    collector.on('end', async () => {
      // Opcional: desactiva los botones al finalizar
      const disabled = new ActionRowBuilder().addComponents(
        botones.components.map(b => b.setDisabled(true))
      );
      try {
        await interaction.editReply({ components: [disabled] });
      } catch {}
    });
  }
};
