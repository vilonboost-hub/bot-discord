const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('garantias')
    .setDescription('💎 Muestra los precios y tipos de garantía disponibles.'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor('#ffffff')
      .setTitle('🛡️ Garantías — Vilon Boost')
      .setDescription(
        'Selecciona la garantía que mejor se adapte a tus necesidades.\n' +
        'Todas las garantías incluyen **soporte prioritario** y **reemplazo gratuito** durante su vigencia.\n\n' +
        '💎 **Tipos de garantía disponibles:**\n\n' +
        '🔹 **1 Día:** 0.50€ — ideal para pruebas o servicios cortos.\n' +
        '🔹 **3 Días:** 1.00€ — cobertura básica para cuentas temporales.\n' +
        '🔹 **7 Días:** 4.00€ — opción más popular para Boosts y Optimizaciones.\n' +
        '🔹 **15 Días:** 7.50€ — cobertura extendida para servicios premium.\n' +
        '🔹 **30 Días:** 15.00€ — máxima protección, ideal para clientes frecuentes.\n\n' +
        '📋 *Los precios pueden variar según el tipo de servicio.*'
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Seguridad y confianza garantizadas 💎' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
