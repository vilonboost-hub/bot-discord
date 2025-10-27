const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pc')
    .setDescription('💻 Te recomienda un PC gamer según tu presupuesto.')
    .addIntegerOption(option =>
      option
        .setName('presupuesto')
        .setDescription('Tu presupuesto en euros (€)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const presupuesto = interaction.options.getInteger('presupuesto');

    let cpu, gpu, ram, ssd, fuente, rendimiento;

    if (presupuesto < 600) {
      cpu = 'AMD Ryzen 5 5600G (gráficos integrados)';
      gpu = 'Integrada Vega 7';
      ram = '16GB DDR4 3200MHz';
      ssd = '500GB NVMe SSD';
      fuente = '550W 80+ Bronze';
      rendimiento = '🎮 Ideal para eSports (Valorant, CS2, LoL, etc.)';
    } else if (presupuesto < 900) {
      cpu = 'Intel i5-12400F / Ryzen 5 5600';
      gpu = 'RTX 3050 / RX 6600';
      ram = '16GB DDR4 3200MHz';
      ssd = '1TB NVMe SSD';
      fuente = '650W 80+ Bronze';
      rendimiento = '🎮 1080p Ultra en la mayoría de juegos.';
    } else if (presupuesto < 1300) {
      cpu = 'Ryzen 5 5600X / i5-13400F';
      gpu = 'RTX 3060 Ti / RX 6700 XT';
      ram = '16GB DDR4 3600MHz';
      ssd = '1TB NVMe SSD';
      fuente = '650W 80+ Bronze';
      rendimiento = '🔥 1080p Ultra + 1440p alto rendimiento.';
    } else if (presupuesto < 1800) {
      cpu = 'Ryzen 7 5800X / i7-13700F';
      gpu = 'RTX 4070 / RX 7800 XT';
      ram = '32GB DDR4 3600MHz';
      ssd = '1TB NVMe SSD';
      fuente = '750W 80+ Gold';
      rendimiento = '🚀 1440p Ultra + 4K jugable.';
    } else {
      cpu = 'Ryzen 7 7800X3D / i7-14700K';
      gpu = 'RTX 4080 / RX 7900 XTX';
      ram = '32GB DDR5 6000MHz';
      ssd = '2TB NVMe SSD';
      fuente = '850W 80+ Gold';
      rendimiento = '💎 4K Ultra sin problema (ideal para streaming).';
    }

    const embed = new EmbedBuilder()
      .setColor('#00e0b3')
      .setTitle(`<:pcc:1432024464232546364> PC recomendado para ${presupuesto}€`)
      .addFields(
        { name: '<:cpu:1432024688199995433> CPU', value: cpu, inline: false },
        { name: '<:gpu:1432024605840773152> GPU', value: gpu, inline: false },
        { name: '<:ram:1432025720787566655> RAM', value: ram, inline: false },
        { name: '<a:Minecraft_chest_opening:1432025580299358228> Almacenamiento', value: ssd, inline: false },
        { name: '<:Power_Expert:1432025666697826356> Fuente', value: fuente, inline: false },
        { name: '<:rocket:1431631598603862036> Rendimiento estimado', value: rendimiento, inline: false }
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Montajes optimizados por la IA de VilonBoost 🧠' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
