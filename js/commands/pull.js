const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = class Pull {
	static name = `pull`
	static description = `Pulls a random item or character from the pool`
	constructor (gacha) {
		this.gacha = gacha
	}
	execute (message, args) { // don't do gacha logic inside of here, this is just for composing the final message!
		const user = message.author,
			channel = message.channel

		let forcedLuck
		if (typeof args[0] !== `undefined` && config.debug)
			forcedLuck = parseFloat(args[0])
		else if (typeof args[0] !== `undefined` && !config.debug)
			return message.reply("using forced luck with debug mode disabled is not allowed")

		const [reward, rarity, debug] = this.gacha.pull(forcedLuck),
			stars = rarity.stars,
			type = reward.constructor.name,
			image = reward.image || `https://i.imgur.com/fndBsb9.png`,
			luck = debug.luck.toFixed(3),
			isCharacter = debug.isCharacter

		console.log(`${user.username} pulled a ${rarity.stars}-star item!`)

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward.name)
				.setAuthor(`${user.username}, you just got:`, user.avatarURL(), ``)
				.setDescription(reward.series || "")
				.addFields(
					{ name: `Type`, value: reward.constructor.name, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(stars), inline: true },
				)
				.setImage(image) // placeholder

		if (config.debug)
			embedMessage.setFooter(`luck = ${luck};\nisCharacter = ${isCharacter};`)

		channel.send(embedMessage)
	}
}