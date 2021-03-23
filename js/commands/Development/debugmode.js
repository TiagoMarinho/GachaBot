const Utils = require(`../../utils.js`)
const rarities = require(`../../rarities.json`)
const Discord = require('discord.js')
const config = require(`../../../config.json`)

module.exports = class DebugMode {
	static name = `debugmode`
	static description = `Displays current debug mode`
	constructor () {
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