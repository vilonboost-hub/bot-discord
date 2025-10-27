const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('legit')
    .setDescription('Publica una reseña verificada del servicio.')
    .addIntegerOption(option =>
      option
        .setName('estrellas')
        .setDescription('Número de estrellas (1 a 5).')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    )
    .addStringOption(option =>
      option
        .setName('producto')
        .setDescription('Nombre del producto o servicio.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reseña')
        .setDescription('Tu opinión o comentario sobre el servicio.')
        .setRequired(true)
    ),

  async execute(interaction) {
    const allowedRoleId = '1431619529167081492';
    const allowedChannels = ['1431619339915759697', '1431241570731954278'];

    // 🔐 Verificar que el comando se use en los canales permitidos
    if (!allowedChannels.includes(interaction.channel.id)) {
      return interaction.reply({
        content: '❌ Este comando solo puede usarse en los canales designados para reseñas.',
        ephemeral: true
      });
    }

    // 🔐 Verificar que el usuario tenga el rol autorizado
    if (!interaction.member.roles.cache.has(allowedRoleId)) {
      return interaction.reply({
        content: '❌ No tienes permiso para usar este comando.',
        ephemeral: true
      });
    }

    const estrellas = interaction.options.getInteger('estrellas');
    const producto = interaction.options.getString('producto');
    const reseña = interaction.options.getString('reseña');

    // ⭐ Crear estrellas visuales
    const estrellasTexto = '<:star2:1431638787313897635>'.repeat(estrellas) + '☆'.repeat(5 - estrellas);

    // 🧾 Crear el embed de reseña
    const embed = new EmbedBuilder()
      .setColor('#00ffcc')
      .setTitle('<:yess:1431638358253109259> Nueva reseña verificada')
      .addFields(
        { name: '<:star1:1431638725313564682> Calificación', value: `${estrellasTexto} (${estrellas}/5)`, inline: false },
        { name: '<:amazon:1431637430804545666> Producto', value: producto, inline: false },
        { name: '<a:legit:1431637801828483152> Reseña', value: reseña, inline: false }
      )
      .setImage('https://media.discordapp.net/attachments/1391742531561066588/1431635934914412695/standard_1.gif?ex=68fe225d&is=68fcd0dd&hm=8b5e85d45580339aa504190d7357b04333132956e333be1d0c8b51a350d17b59&=')
      .setFooter({ text: `Gracias ${interaction.user.username} — Gracias por tu confianza 👑` })
      .setTimestamp();

    // 📢 Enviar la reseña públicamente
    await interaction.reply({ embeds: [embed], ephemeral: false });
  }
};
