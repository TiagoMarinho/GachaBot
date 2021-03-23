const Utils = require(`../../utils.js`)
const User = require(`../../user.js`)
const Gacha = require(`../../gacha.js`)
const Command = require(`../../command.js`)
const Discord = require('discord.js')
const config = require(`../../../config.json`)

module.exports = class Pull extends Command {
	static name = `pull`
	static description = `Pulls a random item or character from the pool`
	static gacha = true
	constructor () {
		super()
	}
	execute (message, args, user, gacha) { // don't do gacha logic inside of here, this is just for composing the final message!
		const discordjsUser = message.author,
			channel = message.channel

		let forcedLuck
		if (typeof args[0] !== `undefined` && config.debug)
			forcedLuck = parseFloat(args[0])
		else if (typeof args[0] !== `undefined` && !config.debug)
			return message.reply("using forced luck with debug mode disabled is not allowed")

		const [reward, rarity, debug] = gacha.pull(forcedLuck),
			stars = rarity.stars,
			type = reward.constructor.name,
			image = reward.image || `https://i.imgur.com/fndBsb9.png`,
			luck = debug.luck.toFixed(3),
			isCharacter = debug.isCharacter,
			worth = reward.worth

		console.log(`${discordjsUser.username} pulled a ${rarity.stars}-star item!`)

		/* just for testing, this doesn't belong here */
		user.inventory.addReward(reward)
		/* end of test code */

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward.name)
				.setAuthor(`${discordjsUser.username}, you just got:`, discordjsUser.avatarURL(), ``)
				.setDescription(reward.series || "")
				.addFields(
					{name: `Value`, value: `$${worth}`, inline: true },
					{name: `Type`, value: reward.constructor.name, inline: true},
					{name: `Rarity`, value: `:star:`.repeat(stars), inline: true},
				)
				.setImage(image)

		if (config.debug)
			embedMessage.setFooter(`luck = ${luck};\nisCharacter = ${isCharacter};`)

		channel.send(embedMessage)
	}
}