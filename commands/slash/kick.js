const { SlashCommandBuilder } = require('discord.js');
const { addBan } = require('../../utils/moderation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Wyrzuć użytkownika')
    .addUserOption(option => option.setName('user').setDescription('Użytkownik').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Powód').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member) return interaction.reply('Użytkownik nie znaleziony');

    await member.kick(reason);
    await interaction.reply(`${user.tag} został wyrzucony. Powód: ${reason}`);
  }
};