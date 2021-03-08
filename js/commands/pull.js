const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)

module.exports = new class Pull {
	constructor () {
		this.name = `pull`
		this.description = `Pulls a random item or character from the pool`

		this.gacha = new Gacha(`./rarities.json`, `./rewards.json`)
	}
	execute (message) { // don't do gacha logic inside of here, this is just for composing the final message!
		const user = message.author,
			channel = message.channel

		const [reward, rarity, debug] = this.gacha.pull()

		console.log(`${user.username} pulled a ${rarity.stars}-star item!`)

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward.name)
				.setAuthor(`${user.username}, you just got:`, user.avatarURL(), ``)
				.setDescription(reward.series || "")
				.addFields(
					{ name: `Type`, value: reward.constructor.name, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(rarity.stars), inline: true },
					{ name: reward.duplicateString, value: message.client.emojis.cache.find(emoji => emoji.name === `C0`) },
				)
				.setImage(`https://i.imgur.com/fndBsb9.png`) // placeholder

		if (config.debug)
			embedMessage.setFooter(`luck = ${debug.luck.toFixed(3)};\nisCharacter = ${debug.isCharacter};`)

		channel.send(embedMessage)
	}
}