const { Utils }  = require(`../utils.js`)
const User  = require(`../user.js`)
const Discord = require('discord.js')

module.exports = {
	name: `pull`,
	description: `pulls a random item or character from wishes.js`,
	execute: (message) => {
		const user = message.author,
			channel = message.channel

		const embedMessage = new Discord.MessageEmbed()
				.setColor(`#ffc300`)
				.setTitle(`Reward Name`)
				.setAuthor(`${user.username}, you just got:`, user.avatarURL(), ``)
				.addFields(
					{ name: `Type`, value: `Item/Character`, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(5), inline: true },
					{ name: `duplicate`, value: `0` },
				)
				.setFooter(`luck = luck; pulls = nPulls; isCharacter = isCharacter`)

		channel.send(embedMessage)
	}
}