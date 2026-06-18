const { SlashCommandBuilder } = require('discord.js');
const { addBan } = require('../../utils/moderation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Zbanuj użytkownika')
    .addUserOption(option => option.setName('user').setDescription('Użytkownik').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Powód').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');

    await addBan(user.id, reason);
    await interaction.guild.members.ban(user, { reason });
    await interaction.reply(`${user.tag} został zbanowany. Powód: ${reason}`);
  }
};