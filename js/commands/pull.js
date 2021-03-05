const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')

class Pull {
	constructor () {
		this.name = `pull`
		this.description = `pulls a random item or character from wishes.js`
	}
	execute (message) { // don't do pulling logic inside of here, this is just for composing the final message!
		const user = message.author,
			channel = message.channel

		const gacha = new Gacha(`./wishlist.json`)
		const [reward, rarity, luck] = gacha.pull()

		console.log(`${user.username} pulled a ${rarity.stars}-star item!`)

		const embedMessage = new Discord.MessageEmbed()
				.setColor(rarity.color)
				.setTitle(reward)
				.setAuthor(`${user.username}, you just got:`, user.avatarURL(), ``)
				.addFields(
					{ name: `Type`, value: `Item/Character`, inline: true },
					{ name: `Rarity`, value: `:star:`.repeat(rarity.stars), inline: true },
					{ name: `duplicate`, value: `0` },
				)
				.setFooter(`luck = ${Math.floor(luck * 100) / 100}; pulls = nPulls; isCharacter = isCharacter`)

		channel.send(embedMessage)
	}
}
module.exports = new Pull()