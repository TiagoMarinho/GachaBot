const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('../config.json');

const pull = require(`./commands/pull.js`)

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `!pull`) {
		message.channel.send(pull.execute(message.author));
	}
});

client.login(config.token);