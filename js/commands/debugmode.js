const Utils = require(`../utils.js`)
const rarities = require(`../rarities.json`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = new class DebugMode {
	constructor () {
		this.name = `debugmode`
		this.description = `Displays current debug mode`
	}
	execute (message, args) {
		const user = message.author,
			channel = message.channel

		const state = config.debug ? "enabled" : "disabled"

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarities[0].color)
				.setTitle(`Debug mode is ${state}`)

		channel.send(embedMessage)
	}
}