const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('../config.json');
const UserManager = require('./user.js');

const commands = {
	pull: require(`./commands/pull.js`)
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content === `!pull`) {
		const messageData = commands.pull.execute(message.author, message.channel);
	}
});

client.login(config.token);