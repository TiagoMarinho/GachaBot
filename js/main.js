const fs = require('fs')
const path = require('path');
const Discord = require('discord.js')
const Gacha = require('./gacha.js')
const WishParser = require('./wishparser.js')

module.exports = class Main {
	constructor (config) {
		this.config = config
		this.client = new Discord.Client()
		this.users = []
		this.gacha = new Gacha()
	}
	run () {
		let commandsByName = {}
		this.buildWishLists(`./rarities.json`, `./rewards.json`)

		this.client.login(this.config.token)

		this.client.once("ready", _ => {
			commandsByName = this.getCommandsFromFiles()
			console.log("Ready!")
		})
		this.client.on("message", message => {
			this.respondToCommands(message, commandsByName)
		})
	}
	buildWishLists (raritiesFile, rewardsFile) {
		const parser = new WishParser(),
			raritiesRawData = require(raritiesFile),
			rewardsRawData = require(rewardsFile)

		this.gacha.rarities = parser.mapRarities(raritiesRawData).reverse()
		this.gacha.rewards = parser.mapRewards(rewardsRawData)
	}
	getCommandsFromFiles () {
		let commandsByName = {}
		const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const Command = require(`./commands/${file}`),
				command = new Command(this.gacha)
			commandsByName[command.name] = command
		}
		return commandsByName
	}
	respondToCommands (message, commandsByName) {
		const prefix = this.config.prefix
		if (!message.content.startsWith(prefix) || message.author.bot) 
			return

		const args = message.content.slice(prefix.length).trim().split(/ +/)
		const command = args.shift().toLowerCase()

		if (typeof commandsByName[command] === `undefined`) 
			return

		try {
			commandsByName[command].execute(message, args)
		} catch (error) {
			console.error(error)
			message.reply('there was an error trying to execute that command!')
		}
	}
}