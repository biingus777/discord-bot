const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/moderation.json');

let data = {
  warns: {},
  mutes: {},
  bans: {}
};

async function loadData() {
  try {
    const content = await fs.readFile(DATA_FILE, 'utf-8');
    data = JSON.parse(content);
  } catch (err) {
    await saveData();
  }
}

async function saveData() {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function addWarn(userId, reason) {
  if (!data.warns[userId]) data.warns[userId] = [];
  data.warns[userId].push({ reason, date: new Date().toISOString() });
  await saveData();
}

async function addMute(userId, duration, reason) {
  const muteEnd = Date.now() + parseDuration(duration);
  if (!data.mutes[userId]) data.mutes[userId] = [];
  data.mutes[userId].push({ reason, muteEnd, duration });
  await saveData();
}

async function addBan(userId, reason) {
  if (!data.bans[userId]) data.bans[userId] = [];
  data.bans[userId].push({ reason, date: new Date().toISOString() });
  await saveData();
}

async function getWarns(userId) {
  return data.warns[userId] || [];
}

async function getMutes(userId) {
  return data.mutes[userId] || [];
}

async function removeMute(userId) {
  if (data.mutes[userId]) {
    delete data.mutes[userId];
    await saveData();
  }
}

function parseDuration(duration) {
  const match = duration.match(/(\d+)(min|h|d)/);
  if (!match) return 0;
  const [, amount, unit] = match;
  const multipliers = { min: 60000, h: 3600000, d: 86400000 };
  return parseInt(amount) * multipliers[unit];
}

module.exports = {
  loadData,
  saveData,
  addWarn,
  addMute,
  addBan,
  getWarns,
  getMutes,
  removeMute,
  parseDuration
};