const { Client, GatewayIntentBits, Collection, ActivityType, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

// Leer comandos slash desde ./commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

// Evento cuando el bot esté listo
client.once('ready', () => {
  console.log('LISTOOO');

  const statuses = [
    { name: 'VilonBoost 💨', type: ActivityType.Playing },
    { name: '🚀 Mejorando servidores', type: ActivityType.Playing },
    { name: '💎 Boosts Premium', type: ActivityType.Watching },
    { name: '🌐 Tu tienda de confianza!', type: ActivityType.Watching }
  ];

  let i = 0;
  setInterval(() => {
    const status = statuses[i];
    client.user.setPresence({
      status: 'dnd',
      activities: [status]
    });
    i = (i + 1) % statuses.length;
  }, 10000);
});

// Ejecutar slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: '❌ Hubo un error al ejecutar este comando.', ephemeral: true });
  }
});

// ======================================================
// 🎫 SISTEMA DE DETECCIÓN AUTOMÁTICA EN CANALES DE TICKETS
// ======================================================

const respondedChannels = new Set();

client.on('messageCreate', async (message) => {
  // Ignorar mensajes del bot
  if (message.author.bot) return;

  // Verificar si el canal se llama "ticket-<número>"
  if (!/^ticket-\d+$/i.test(message.channel.name)) return;

  // Verificar si ya respondió en este canal
  if (respondedChannels.has(message.channel.id)) return;

  // Palabras clave para activar el mensaje
  const palabrasClave = ['hola', 'buenas', 'que tal', 'que hay', 'optimizacion', 'opti', 'programa'];
  const contenido = message.content.toLowerCase();

  // Verificar si contiene alguna palabra clave
  const contienePalabra = palabrasClave.some(palabra => contenido.includes(palabra));
  if (!contienePalabra) return;

  // Enviar el embed de bienvenida al ticket
  const embed = new EmbedBuilder()
    .setColor('#00b8ff')
    .setTitle('👋 ¡Bienvenido al soporte de Vilon Boost!')
    .setDescription(
      'Gracias por contactarnos 💨\n\n' +
      'Un miembro del equipo te atenderá en breve.\n\n' +
      'Por favor, explica tu situación o el servicio que necesitas para poder ayudarte mejor.'
    )
    .setFooter({ text: 'Vilon Boost © 2025 — Soporte al cliente' })
    .setTimestamp();

  await message.channel.send({ embeds: [embed] });

  // Guardar este canal como ya respondido
  respondedChannels.add(message.channel.id);
});

client.login(config.token);
