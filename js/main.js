const config = require(`../config.json`),
	Client = require(`./client.js`),
	fs = require(`fs`),
	path = require(`path`)

module.exports = class Main {
	constructor () {
		this.client = new Client()
		this.config = config
		this.commands = this.getCommandsFromFiles()
	}
	run () {
		this.client.login(this.config.token)
		console.log(`Logging in...`)

		this.client.addEventListener(`ready`, _ => {
			console.log("Logged in!")
		})

		this.client.addEventListener(`message`, message => {
			this.commandHandler(message)
		})
	}
	getCommandsFromFiles () {
		const commands = []

		const commandFolders = fs.readdirSync(`./js/commands`)
		for (const folder of commandFolders) {
			const commandFiles = fs.readdirSync(`./js/commands/${folder}`)
			for (const file of commandFiles) {
				const Command = require(`./commands/${folder}/${file}`)
				commands.push(new Command())
			}
		}
		return commands
	}
	commandHandler (message) {
		const prefix = this.config.prefix

		if (!message.content.startsWith(prefix) || message.author.bot) 
			return

		const args = message.content.slice(prefix.length).trim().split(/ +/),
			commandName = args.shift().toLowerCase()

		const command = this.commands.find(cmd => cmd.name === commandName)
			|| this.commands.find(cmd => cmd.aliases.includes(commandName))

			console.log(command.aliases)

		if (typeof command === `undefined`) 
			return

		try {
			command.execute(message, args)
		} catch (error) {
			console.error(error)
			message.reply('there was an error trying to execute that command!')
		}
	}
}