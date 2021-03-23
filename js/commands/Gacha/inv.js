const Utils = require(`../../utils.js`)
const User = require(`../../user.js`)
const Gacha = require(`../../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../../config.json`)

module.exports = class Inv {
	static name = `inv`
	static description = `Displays the contents of your inventory`
	constructor (gacha) {
		this.gacha = gacha
	}
	execute (message, args, user) {
		const discordjsUser = message.author,
			channel = message.channel

		const rewardsOrderedByRarity = user.inventory.getAllRewards().sort((a, b) => b.worth - a.worth)
		const firstElement = rewardsOrderedByRarity[0] || {image: `https://i.imgur.com/fndBsb9.png`}
		const image = firstElement.image || `https://i.imgur.com/fndBsb9.png`

		const embedMessage = new Discord.MessageEmbed()
				.setColor(`#888888`)
				.setTitle(user.name)
				.setDescription(`here's your inventory:`)
				.setThumbnail(image)
				.addField(`Bank:`, `$${user.inventory.gold}`, false)

		for (const reward of rewardsOrderedByRarity) {
			embedMessage.addFields(
				{name: reward.name, value: `$${reward.worth}`, inline: false},
			)
		}

		channel.send(embedMessage)
	}
}