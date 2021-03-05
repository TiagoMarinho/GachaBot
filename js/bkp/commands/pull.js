const { wishes }  = require(`../wishes.js`)
const Utils  = require(`../utils.js`)
const User  = require(`../user.js`)
const Discord = require('discord.js')

module.exports = {
	name: `pull`,
	description: `pulls a random item or character from wishes.js`,
	execute: (user, channel) => {

		let player = new User(user), // no need to do this every time
			numberOfPulls

		new Promise((resolve, reject) => { // this shit here must be fixed, this is utterly confusing to say the least
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
			
			let item,
				stars,
				type,
				color,
				duplicate,
				rewards,
				isCharacter

			for (const key in wishes) {
				if (wishes.hasOwnProperty(key)) {
					const rarity = wishes[key]
					isCharacter = Utils.getRandomBool() && rarity.stars > 2
					if (luck > rarity.minWeight) {
						rewards = isCharacter ? rarity.rewards.characters : rarity.rewards.items
						item = Utils.getRandomItem(rewards)
						stars = rarity.stars
						type = item.type
						color = rarity.color
						duplicate = item.duplicate
						break
					}
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
					{ name: duplicate, value: `0` },
				)
				.setFooter(`luck = ${Math.floor(luck)}; pulls = ${numberOfPulls}; isCharacter = ${isCharacter}`)

			channel.send(embedMessage)
		}

	}
}