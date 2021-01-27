const { pulls }  = require(`../pulls.js`)
const { Utils }  = require(`../utils.js`)
const User  = require(`../user.js`)
const Discord = require('discord.js');

module.exports = {
	name: `pull`,
	description: `pull a random item or character from pulls.js`,
	execute: (user, channel) => {

		let player = new User(user),
			numberOfPulls

		new Promise((resolve, reject) => { 
			player.getStoredData(resolve, reject) 
		})
			.then(_ => {
				numberOfPulls = player.userData.pullsThisCycle + 1 || 1
				player.userData.pullsThisCycle = numberOfPulls

				return new Promise((resolve, reject) => { 
					player.saveDataToStorage(resolve, reject) 
				})
			})
			.then(_ => {
				roll()
			})

		const roll = _ => {
			const luck = Utils.getRandomFloat(0, 100)
			
			let result,
				stars,
				type,
				color

			for (const rarity of pulls) {
				if (luck > rarity.minWeight) {
					item = Utils.getRandomItem(rarity.rewards)
					stars = rarity.stars
					type = item.type
					color = rarity.color
					break
				}
			}

			let starsString = ``
			for (let i = 0; i < stars; ++i) {
				starsString += `:star:`
			}

			const embedMessage = new Discord.MessageEmbed()
				.setColor(color)
				.setTitle(item.name)
				.setAuthor(`${user.username}, you just got:`, user.avatarURL(), '')
				.addFields(
					{ name: `Type`, value: `${type}`, inline: true },
					{ name: `Rarity`, value: `${starsString}`, inline: true },
				)
				.setFooter(`luck = ${Math.floor(luck)}, pulls = ${numberOfPulls}`)

			channel.send(embedMessage)
		}

	}
}