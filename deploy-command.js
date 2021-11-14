require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('replies with pong!'),
].map(command => command.toJSON());

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

console.log(`clientId: ${clientId}, guildId: ${guildId}`)

const rest = new REST({version: '9'}).setToken(process.env.BOT_TOKEN);

rest.put(
  Routes.applicationGuildCommands(clientId, guildId),
  {body: commands}
).then(() => {
  console.log('Successfully registered commands')
}).catch(console.error);