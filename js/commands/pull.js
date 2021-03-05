const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')

class Pull {
	constructor () {
		this.name = `pull`
		this.description = `pulls a random item or character from wishes.js`

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
					{ name: `Type`, value: `Item/Character`, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(rarity.stars), inline: true },
					{ name: reward.duplicateString, value: `0` },
				)
				.setFooter(`luck = ${Math.floor(debug.luck * 100) / 100}; pulls = missing; isCharacter = ${debug.isCharacter}`)

		channel.send(embedMessage)
	}
}
module.exports = new Pull()