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
    .setName('pagos')
    .setDescription('Ver métodos de pago y políticas de VilonBoost'),

  async execute(interaction) {
    // 📄 Embed principal
    const mainEmbed = new EmbedBuilder()
      .setColor('#00b8ff')
      .setTitle('💳 Métodos de Pago — Vilon Boost')
      .setDescription(
        '**Política de pagos/compras:**\n' +
        'Los pagos deben realizarse **solo** por los métodos oficiales proporcionados por el bot.\n' +
        'Una vez hayas completado tu primera compra/pago habrás **aceptado** automaticamente nuestra politica de pagos.\n' +
        'Una vez confirmado el pago, el servicio se activa automáticamente de lo contrario menciona a <@1057306102326370314> o <@1033018083582939147> para completar la compra.\n\n' +
        'Selecciona un método de pago para ver la información detallada 👇'
      )
      .setFooter({ text: 'Vilon Boost © 2025' });

    // 🎛️ Botones
    const botones = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('paypal')
        .setLabel('💸 PayPal')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('transferencia')
        .setLabel('🏦 Transferencia')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId('paysafecard')
        .setLabel('💰 Paysafecard')
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId('amazon')
        .setLabel('🎁 Amazon Gift Card')
        .setStyle(ButtonStyle.Danger)
    );

    await interaction.reply({
      embeds: [mainEmbed],
      components: [botones],
      ephemeral: false
    });

    // 🎯 Crear el collector de botones
    const collector = interaction.channel.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 180000 // 3 minutos
    });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({
          content: '❌ Solo el usuario que ejecutó el comando puede usar estos botones.',
          ephemeral: true
        });
      }

      // 📦 Embeds de respuesta (en mensajes nuevos)
      if (i.customId === 'paypal') {
        const paypalEmbed = new EmbedBuilder()
          .setColor('#0070ba')
          .setTitle('💸 Pago mediante PayPal')
          .setDescription(
            'Envía tu pago a:\n`vicedofivem@gmail.com`\n\n' +
            'Incluye tu id de **Discord** en la nota del pago para verificar mas rápido.`\n\n' +
            'RECUERDA QUE TODOS LOS PAGOS DEBEN SER ENVIADOS COMO **AMIGOS O FAMILIAR** en caso de no poder ser comunicarlo antes.`\n\n' +
            'Todos los pagos que se hayan efectuado sin amigos y familiares no seran ni entregado el producto ni reembolsado el dinero.'
          )
          .setFooter({ text: 'Método de pago: PayPal' });
        await i.reply({ embeds: [paypalEmbed], ephemeral: false });
      }

      if (i.customId === 'transferencia') {
        const bankEmbed = new EmbedBuilder()
          .setColor('#4caf50')
          .setTitle('🏦 Pago mediante Transferencia Bancaria')
          .setDescription(
            '**Banco:** Sirven todos\n' +
            '**Titular:** Vilon Boost.\n' +
            '**IBAN:** `ES68 1583 0001 1190 0327 6423`\n\n' +
            'Envía el comprobante al soporte para confirmar el pago.'
          )
          .setFooter({ text: 'Método de pago: Transferencia' });
        await i.reply({ embeds: [bankEmbed], ephemeral: false });
      }

      if (i.customId === 'paysafecard') {
        const pscEmbed = new EmbedBuilder()
          .setColor('#ffcc00')
          .setTitle('💰 Pago mediante Paysafecard')
          .setDescription(
            'Aceptamos **Paysafecard**.\n\n' +
            'Envía el código completo por mensaje privado a <@1057306102326370314>.\n' +
            '⚠️ Solo aceptamos tarjetas de **10 €, 25 €, 50 € o 100 €**.'
          )
          .setFooter({ text: 'Método de pago: Paysafecard' });
        await i.reply({ embeds: [pscEmbed], ephemeral: false });
      }

      if (i.customId === 'amazon') {
        const amazonEmbed = new EmbedBuilder()
          .setColor('#ff9900')
          .setTitle('🎁 Pago mediante Amazon Gift Card')
          .setDescription(
            'Aceptamos **Amazon Gift Cards (España)**.\n\n' +
            'Envía el código al dm de:\n`<@1057306102326370314>'
          )
          .setFooter({ text: 'Método de pago: Amazon Gift Card' });
        await i.reply({ embeds: [amazonEmbed], ephemeral: false });
      }
    });

    collector.on('end', async () => {
      // opcional: desactivar botones después del tiempo
      const disabled = new ActionRowBuilder().addComponents(
        botones.components.map(b => b.setDisabled(true))
      );
      try {
        await interaction.editReply({ components: [disabled] });
      } catch {}
    });
  }
};
