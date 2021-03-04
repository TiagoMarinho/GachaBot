const fs = require('fs')
const path = require('path');

module.exports = class Main {
	constructor (config) {
		this.config = config
		this.users = []
		this.commandsByName = {}
	}
	run () {
		this.commandsByName = this._getCommandsFromFiles()
	}
	_getCommandsFromFiles () {
		let commandsByName = {}
		const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const command = require(`./commands/${file}`)
			commandsByName[command.name] = command
		}
		return commandsByName
	}
	commandResponseHook (message) {
		const prefix = this.config.prefix
		if (!message.content.startsWith(prefix) || message.author.bot) 
			return

		const args = message.content.slice(prefix.length).trim().split(/ +/)
		const command = args.shift().toLowerCase()

		if (typeof this.commandsByName[command] === `undefined`) 
			return

		try {
			this.commandsByName[command].execute();
		} catch (error) {
			console.error(error)
			message.reply('there was an error trying to execute that command!')
		}
	}
}