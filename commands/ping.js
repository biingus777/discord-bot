const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Sprawdza ping bota'),
  async execute(interaction) {
    const ping = interaction.client.ws.ping;
    await interaction.reply(`🏓 Pong! Ping: ${ping}ms`);
  },
};