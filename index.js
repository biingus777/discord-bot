const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { loadData } = require('./utils/moderation');
require('dotenv').config();

if (process.env.CLEAR_COMMANDS === 'true') {
 const tempClient = new Client({ intents: [GatewayIntentBits.Guilds] });
 tempClient.once('ready', async () => {
 try {
 await tempClient.application.commands.set([]);
 console.log('✅ Komendy wyczyszczone!');
 process.exit(0);
 } catch (error) {
 console.error('❌ Błąd przy czyszczeniu komend:', error);
 process.exit(1);
 }
 });
 tempClient.login(process.env.DISCORD_TOKEN);
} else {
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

 client.once('ready', async () => {
 await loadData();
 console.log(`✅ Bot zalogowany jako ${client.user.tag}`);
 console.log('✅ Dane załadowane');
 });

 client.login(process.env.DISCORD_TOKEN);
}