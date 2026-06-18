const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Usuń wiadomości')
    .addIntegerOption(option => option.setName('amount').setDescription('Ilość wiadomości').setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    if (amount < 1 || amount > 100) return interaction.reply('Podaj liczbę od 1 do 100');

    await interaction.channel.bulkDelete(amount);
    await interaction.reply(`Usunięto ${amount} wiadomości`);
  }
};