const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')

const config = require('../config.json')

client.once('ready', () => {
	console.log('Ready!')

	const gachaBot = new Main()
	gachaBot.getCommandsFromFiles()
	gachaBot.listenToCommands()
})

client.login(config.token)

class Main {
	constructor () {
		this.config = require('../config.json')
		this.users = []
		this.commands = {}
	}
	getCommandsFromFiles () {
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`)
			this.commands[command.name] = command
		}
	}
	listenToCommands () {
		client.on('message', message => {
			const prefix = this.config.prefix
			if (!message.content.startsWith(prefix) || message.author.bot) 
				return

			const args = message.content.slice(prefix.length).trim().split(/ +/)
			const command = args.shift().toLowerCase()

			if (typeof this.commands[command] === `undefined`) 
				return

			try {
				this.commands[command].execute();
			} catch (error) {
				console.error(error)
				message.reply('there was an error trying to execute that command!')
			}
		})
	}
}