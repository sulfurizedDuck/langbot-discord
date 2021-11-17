require('dotenv').config();
const {Client, Intents} = require('discord.js');
const database = require('./db/database');
const BondQueryProcessor = require('./query/BondQueryProcessor');
const NicknameQueryProcessor = require('./query/NicknameQueryProcessor');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async(message) => {
  if (message.author.bot) return;

  if (message.content[0] != '/') return;

  const content = message.content.slice(1).trim();
  let args = content.split(/ +/g);
  const command = args.shift().toLowerCase();
  let parameter = args.join(' ');

  let response = null;

  switch(command) {
    case 'bond':
      response = await BondQueryProcessor.getBond(parameter);
      break;
    case 'addnickname':
      const [unitName, nickname] = parameter.split(',').map(x => x.trim());
      response = await NicknameQueryProcessor.insertNickname(unitName, nickname);
      break;
  }

  if (response) {
    message.channel.send(response);
  }

});

client.login(process.env.BOT_TOKEN);
