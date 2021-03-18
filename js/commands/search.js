const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = class Search {
	static name = `search`
	static description = `Searches for items or characters from the pool`
	constructor (gacha) {
		this.gacha = gacha
	}
	execute (message, args) {
		const user = message.author,
			channel = message.channel

		if (typeof args[0] === `undefined`)
			return message.reply(`please specify the character/item name!`)

		let name = ``
		for (const arg of args) {
			name += `${arg}`
		}

		const result = this.gacha.getRewardByName(name)

		console.log(`${user.username} searched for "${name}"`)

		if (!result)
			return message.reply(`no results found for "${name}"!`)

		const reward = result,
			rarity = this.gacha.rarities.find(rarity => rarity.stars === reward.stars), // could be done through index too
			stars = rarity.stars,
			type = reward.constructor.name,
			worth = reward.worth,
			image = reward.image || `https://i.imgur.com/fndBsb9.png`

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward.name)
				.setAuthor(`${user.username}, here's the result:`, user.avatarURL(), ``)
				.setDescription(reward.series || "")
				.addFields(
					{name: `Value`, value: `$${worth}`, inline: true},
					{name: `Type`, value: reward.constructor.name, inline: true},
					{name: `Rarity`, value: `:star:`.repeat(stars), inline: true},
				)
				.setImage(image)

		channel.send(embedMessage)
	}
}