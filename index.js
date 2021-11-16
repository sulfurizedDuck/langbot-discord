require('dotenv').config();
const {Client, Intents} = require('discord.js');
const database = require('./db/database');
const BondQueryProcessor = require('./query/BondQueryProcessor');
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
  const args = content.split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command == 'bond') {
    let response = await BondQueryProcessor.getBond(args[0]);
    if (response) {
      message.channel.send(response);
    }
  }

});

client.login(process.env.BOT_TOKEN);
