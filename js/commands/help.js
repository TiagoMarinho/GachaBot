const Utils = require(`../utils.js`)
const fs = require('fs')
const path = require('path');
const config = require(`../../config.json`)
const Discord = require('discord.js')

module.exports = new class Help {
	constructor () {
		this.name = `help`
		this.description = `Provides instructions on how to use this bot`
	}
	execute (message) {
		const user = message.author,
			channel = message.channel

		const embedMessage = new Discord.MessageEmbed()
				.setColor(`#888888`)
				.setTitle(`Help`)

		const commandsByName = this.getCommandsFromFiles()

		for (let name in commandsByName) {
			if (commandsByName.hasOwnProperty(name)) {
				const command = commandsByName[name]
				embedMessage.addFields(
					{ name: config.prefix + command.name, value: command.description, inline: false },
				)
			}
		}

		channel.send(embedMessage)
	}
	getCommandsFromFiles () {
		let commandsByName = {}
		const commandFiles = fs.readdirSync(`./js/commands`).filter(file => file.endsWith('.js'))
		for (const file of commandFiles) {
			const command = require(`./${file}`)
			commandsByName[command.name] = command
		}
		return commandsByName
	}
}