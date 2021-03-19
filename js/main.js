const fs = require('fs')
const path = require('path');
const Discord = require('discord.js')
const Gacha = require('./gacha.js')
const WishParser = require('./wishparser.js')
const UserManager = require('./usermanager.js')
const User = require('./user.js')

module.exports = class Main {
	constructor (config) {
		this.config = config
		this.client = new Discord.Client()
		this.userManager = new UserManager()
		this.gacha = new Gacha()
	}
	run () {
		let commandsByName = {}
		this.buildWishLists(`./rarities.json`, `./rewards.json`)

		this.client.login(this.config.token)
		console.log(`Logging in...`)

		this.client.once(`ready`, _ => {
			commandsByName = this.getCommandsFromFiles()
			console.log(`Ready!`)
		})
		this.client.on(`message`, message => {
			this.respondToCommands(message, commandsByName)
		})
	}
	buildWishLists (raritiesFile, rewardsFile) { // unsure if this belongs here
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
			const Command = require(`./commands/${file}`)
			commandsByName[Command.name] = new Command(this.gacha)
		}
		return commandsByName
	}
	respondToCommands (message, commandsByName) {
		const prefix = this.config.prefix

		if (!message.content.startsWith(prefix) || message.author.bot) 
			return

			
			const args = message.content.slice(prefix.length).trim().split(/ +/),
			command = args.shift().toLowerCase()
			if (typeof commandsByName[command] === `undefined`) 
				return

		let user = this.userManager.getUser(message.author.id) 
		if (typeof user === `undefined`) {
			user = new User(message.author.username, message.author.id)
			this.userManager.addChild(user)
			console.log(`Created user "${user.name}"`)
		}

		try {
			commandsByName[command].execute(message, args, user)
		} catch (error) {
			console.error(error)
			message.reply('there was an error trying to execute that command!')
		}
	}
}