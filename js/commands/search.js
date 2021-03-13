const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = new class Search {
	constructor () {
		this.name = `search`
		this.description = `Searches for items or characters from the pool`

		this.gacha = new Gacha(`./rarities.json`, `./rewards.json`)
	}
	execute (message, args) {
		const user = message.author,
			channel = message.channel

		if (typeof args[0] === `undefined`)
			return message.reply(`please specify the character/item name!`)

		let name = ``
		for (const arg of args) {
			name += `${arg} `
		}

		const result = this.gacha.getRewardByName(name)
		if (!result)
			return message.reply(`${name}returned no results!`)

		const [reward, rarity] = result,
			stars = rarity.stars,
			type = reward.constructor.name,
			image = reward.image || `https://i.imgur.com/fndBsb9.png`

		console.log(`${user.username} searched for ${reward.name}`)

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward.name)
				.setAuthor(`${user.username}, here's the result:`, user.avatarURL(), ``)
				.setDescription(reward.series || "")
				.addFields(
					{ name: `Type`, value: reward.constructor.name, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(stars), inline: true }
				)
				.setImage(image) // placeholder

		channel.send(embedMessage)
	}
}