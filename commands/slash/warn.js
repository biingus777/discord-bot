const { SlashCommandBuilder } = require('discord.js');
const { addWarn, getWarns } = require('../../utils/moderation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Ostrzeż użytkownika')
    .addUserOption(option => option.setName('user').setDescription('Użytkownik').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Powód').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    await addWarn(user.id, reason);
    const warns = await getWarns(user.id);
    await interaction.reply(`${user.tag} otrzymał ostrzeżenie. Powód: ${reason}\nLiczba ostrzeżeń: ${warns.length}`);
  }
};