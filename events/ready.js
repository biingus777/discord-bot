module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Bot zalogowany jako ${client.user.tag}`);
    client.user.setActivity('Discord Bot v1.0', { type: 'PLAYING' });

    try {
      const commands = Array.from(client.commands.values()).map(cmd => cmd.data);
      await client.application.commands.set(commands);
      console.log(`✅ Komendy zarejestrowane! (${commands.length})`);
    } catch (error) {
      console.error('❌ Błąd przy rejestrowaniu komend:', error);
    }
  },
};