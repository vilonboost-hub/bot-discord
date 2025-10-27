const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Envía un mensaje invitando a dejar una reseña del servicio.'),
  
  async execute(interaction) {
    // Embed principal del feedback
    const embed = new EmbedBuilder()
      .setColor('#00e0b3')
      .setTitle('⭐ ¡Tu opinión importa!')
      .setDescription(
        'Si estás **satisfecho con tu servicio**, nos encantaría leer tu experiencia <:rocket:1431631598603862036>\n\n' +
        `<a:speakeras:1431632089127583866> Puedes dejar tu reseña en el canal <#1431619339915759697> usando el comando **/legit**.\n\n` +
        `<:shopp:1431633069353472010> *Solo los miembros con el rol <@&1431619529167081492> podrán usar /legit para escribir reseñas.*\n\n` +
        '¡Gracias por confiar en **Vilon Boost** <a:coronaking:1431633827628974110>!'
      )
      .setFooter({ text: 'Vilon Boost © 2025 — Tu confianza, nuestra prioridad.' })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed],
      ephemeral: false
    });
  }
};