const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = class Inv {
	static name = `inv`
	static description = `Displays the contents of your inventory`
	constructor (gacha, userManager) {
		this.gacha = gacha
		this.userManager = userManager
	}
	execute (message, args) {
		const discordjsUser = message.author,
			channel = message.channel

		let user = this.userManager.getUser(message.author.id) 
		if (typeof user === `undefined`) {
			user = new User(message.author.username, message.author.id)
			this.userManager.addChild(user)
			console.log(`Created user "${user.name}"`)
		}

		const rewardsOrderedByRarity = user.inventory.getAllRewards().sort((a, b) => b.worth - a.worth)
		const image = rewardsOrderedByRarity[0].image || `https://i.imgur.com/fndBsb9.png`


		const embedMessage = new Discord.MessageEmbed()
				.setColor(`#888888`)
				.setTitle(user.name)
				.setDescription(`here's your inventory:`)
				.setThumbnail(image)

		for (const reward of rewardsOrderedByRarity) {
			embedMessage.addFields(
				{name: reward.name, value: `$${reward.worth}`, inline: false},
			)
		}

		channel.send(embedMessage)
	}
}