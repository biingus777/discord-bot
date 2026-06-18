const { SlashCommandBuilder } = require('discord.js');
const { addMute } = require('../../utils/moderation');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Wycisz użytkownika')
    .addUserOption(option => option.setName('user').setDescription('Użytkownik').setRequired(true))
    .addStringOption(option => option.setName('duration').setDescription('Czas (10min, 1h, 1d)').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('Powód').setRequired(true)),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const duration = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason');
    const member = await interaction.guild.members.fetch(user.id);

    if (!member) return interaction.reply('Użytkownik nie znaleziony');

    await addMute(user.id, duration, reason);
    await member.timeout(require('../../utils/moderation').parseDuration(duration), reason);
    await interaction.reply(`${user.tag} został wyciszony na ${duration}. Powód: ${reason}`);
  }
};