module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(`✅ Bot zalogowany jako ${client.user.tag}`);
    client.user.setActivity('Discord Bot v1.0', { type: 'PLAYING' });
  },
};