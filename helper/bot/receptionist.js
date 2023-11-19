require('dotenv').config({ path: '../../.env' });
const mineflayer = require('mineflayer')
const yaml = require('js-yaml');
const fs = require('fs');

HOST_ADDRESS = process.env.HOST_ADDRESS
HOST_PORT = process.env.HOST_PORT
HOST_AUTH_MODE = process.env.HOST_AUTH_MODE
BOT_NAME = process.env.BOT_NAME

const playersYaml = fs.readFileSync('../../plugins/PowerRanks/players.yml', 'utf8')
const playerData = yaml.load(playersYaml);
const playerNames = Object.values(playerData).map(player => player.name)

const bot = mineflayer.createBot({
  host: HOST_ADDRESS,
  username: BOT_NAME,
  auth: HOST_AUTH_MODE,
  port: HOST_PORT,
  // version: false
  // password: '12345678'
});

bot.on('spawn', () => {
  // Adicionar permissoes pro bot
})

bot.on('playerJoined', (player) => {
  if (!playerNames.includes(player.username)) {
    bot.chat(`Meu novo escravinho ${player.username} chegou! Cade o PR?`);
    playerNames.push(player.username);
  }
});

bot.on('kicked', (reason) => console.log('Bot foi expulso:', reason));
bot.on('error', (err) => console.log('Erro no bot:', err));