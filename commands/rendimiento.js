const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Valores de FPS estimados base por GPU
const gpuData = {
  'gtx 1650': { base: 80 },
  'gtx 1660': { base: 100 },
  'rtx 3050': { base: 110 },
  'rtx 3060': { base: 140 },
  'rtx 3060 ti': { base: 160 },
  'rtx 3070': { base: 180 },
  'rtx 4060': { base: 220 },
  'rtx 4070': { base: 220 },
  'rtx 4080': { base: 260 },
  'rx 6600': { base: 120 },
  'rx 6700 xt': { base: 170 },
  'rx 7800 xt': { base: 210 },
  'rx 7900 xtx': { base: 260 },
};

// Bonus por CPU
const cpuData = {
  'i3': 0.9,
  'i5': 1.0,
  'i7': 1.1,
  'i9': 1.2,
  'ryzen 3': 0.9,
  'ryzen 5': 1.0,
  'ryzen 7': 1.1,
  'ryzen 9': 1.2
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rendimiento')
    .setDescription('🎮 Estima los FPS que tendrás con tu GPU y CPU.')
    .addStringOption(option =>
      option
        .setName('gpu')
        .setDescription('Tu tarjeta gráfica (ej: RTX 3060)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('cpu')
        .setDescription('Tu procesador (ej: Ryzen 5 5600)')
        .setRequired(true)
    ),

  async execute(interaction) {
    const gpuInput = interaction.options.getString('gpu').toLowerCase();
    const cpuInput = interaction.options.getString('cpu').toLowerCase();

    // Buscar GPU
    const gpu = Object.keys(gpuData).find(key => gpuInput.includes(key));
    if (!gpu) {
      return interaction.reply({
        content: '❌ No reconozco esa GPU. Ejemplo válido: RTX 3060, RX 6700 XT, GTX 1660...',
        ephemeral: true
      });
    }

    // Buscar CPU
    const cpu = Object.keys(cpuData).find(key => cpuInput.includes(key));
    if (!cpu) {
      return interaction.reply({
        content: '❌ No reconozco ese procesador. Ejemplo válido: Ryzen 5, i7, etc.',
        ephemeral: true
      });
    }

    const fpsBase = gpuData[gpu].base;
    const multiplier = cpuData[cpu];
    const fps = Math.round(fpsBase * multiplier);

    const embed = new EmbedBuilder()
      .setColor('#00b8ff')
      .setTitle(`🎮 Estimación de FPS — ${gpu.toUpperCase()} + ${cpu.toUpperCase()}`)
      .setDescription('Rendimiento aproximado (configuración Ultra 1080p):')
      .addFields(
        { name: '<:valorant69:1432031354450874621> Valorant', value: `${fps + 100} FPS`, inline: true },
        { name: '<:fornite:1432031376940466226> Fortnite', value: `${fps} FPS`, inline: true },
        { name: '<:GTA:1432031368942190592> GTA V', value: `${Math.round(fps * 0.8)} FPS`, inline: true },
        { name: '<:call_of_duty_warzone55:1432031337665003742> Warzone', value: `${Math.round(fps * 0.7)} FPS`, inline: true },
        { name: '<:cyberpunk46:1432031385945772092> Cyberpunk 2077', value: `${Math.round(fps * 0.5)} FPS`, inline: true }
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Datos estimados, pueden ser optimizables 💨' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
