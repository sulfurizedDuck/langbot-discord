require('dotenv').config();
const {Client, Intents} = require('discord.js');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content[0] != '/') return;

  const content = message.content.slice(1).trim();
  const args = content.split(/ +/g);
  const command = args.shift().toLowerCase();

  // TODO args content and answer from database
});

client.login(process.env.BOT_TOKEN);
