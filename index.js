// 1. Importy (require, const client = new Client(), itp.)
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// 2. TUTAJ DODAJ KOD DO CZYSZCZENIA KOMEND
if (process.env.CLEAR_COMMANDS === 'true') {
  client.once('ready', async () => {
    try {
      await client.application.commands.set([]);
      console.log('✅ Komendy wyczyszczone!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Błąd przy czyszczeniu komend:', error);
      process.exit(1);
    }
  });
}

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
});

client.commands = new Collection();

// Ładowanie komend
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
  }
}

// Ładowanie eventów
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);