const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('boost')
    .setDescription('💎 Envía las recompensas por boostear el servidor.'),

  async execute(interaction) {
    const allowedUsers = ['1057306102326370314', '1033018083582939147'];

    // 🔒 Verificar si el usuario está autorizado
    if (!allowedUsers.includes(interaction.user.id)) {
      return interaction.reply({
        content: '❌ No tienes permiso para usar este comando.',
        ephemeral: true
      });
    }

    // 🔗 Personaliza aquí tu enlace y key:
    const enlace = 'https://mega.nz/XXXXXXXXXXXX'; // 🔧 <-- pon tu enlace de MEGA
    const key = 'ABCDEF123456'; // 🔧 <-- pon aquí tu key

    // 🧾 Embed del mensaje
    const embed = new EmbedBuilder()
      .setColor('#ffffff')
      .setTitle('💎 ¡Gracias por boostear el servidor!')
      .setDescription(
        'Recuerda que filtrar esto es motivo de **PERMABAN**<a:speakeras:1431632089127583866>\n\n' +
        '**Aquí tienes tus recompensas exclusivas:**\n\n' +
        `📁 **Enlace:** [Descargar aquí](${enlace})\n` +
        `🔑 **Key:** \`${key}\`\n\n` +
        `<a:legit:1431637801828483152> *Déjanos un comentario positivo en* <#1431619339915759697> <a:legit:1431637801828483152>`
      )
      .setImage('https://images-ext-1.discordapp.net/external/-oOD2MAylnRbKhcACcNH1saxYgAtAAT_YP9PlxGl97o/%3Fwidth%3D400%26height%3D225/https/images-ext-1.discordapp.net/external/ptEpzTb_qOf568joYEQXIE1iNA9ebOOWvWeOPHMu7Nc/https/share.creavite.co/665924cab5b565ba12593bbf.gif')
      .setFooter({ text: 'Vilon Boost © 2025 — Recompensas por boostear 💎' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
