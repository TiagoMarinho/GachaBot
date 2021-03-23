const Utils = require(`../../utils.js`)
const rarities = require(`../../rarities.json`)
const Discord = require('discord.js')
const config = require(`../../../config.json`)

module.exports = class Daily {
	static name = `daily`
	static description = `Gives a random gold reward`
	constructor () {
	}
	execute (message, args, user) {
		const discordjsUser = message.author,
			channel = message.channel,
			seedMin = 0.25,
			seedMax = 1,
			isJackpot = Utils.getRandomInt(1, 10) <= 2, // todo: use rarity minWeight instead
			seed = (isJackpot ? 
				Utils.getRandomFloat(0.5, 1) : 
				Utils.getRandomFloat(0.25, 0.5)),
			reward = Math.floor(seed * seed * 1000),
			normalizedSeed = (seed - seedMin) / (seedMax - seedMin),
			rarityIndex = Math.floor(normalizedSeed / 0.2),
			rarity = rarities[rarityIndex],
			emojiMessage = `${rarity.emoji} `.repeat(rarity.stars)

		user.inventory.gold += reward

		console.log(`${discordjsUser.username} got $${reward} from the daily reward!`)

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setAuthor(`Daily Reward:`)
				.setTitle(`**$${reward}**\n${emojiMessage}`)
			
		if (config.debug)
			embedMessage.setFooter(`isJackpot = ${isJackpot}\nseed = ${Math.floor(seed * 1000) / 1000}\nrarity = ${rarity.name}`)

		channel.send(embedMessage)
	}
}