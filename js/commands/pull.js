const { pulls }  = require(`../pulls.js`)
const { Utils }  = require(`../utils.js`)
const fs = require('fs');
module.exports = {
	name: `gacha`,
	description: `pull a random item or character from pulls.js`,
	execute: user => {

		fs.readFile('./userdata/userdata.txt', 'utf8', function (err, data) {
			if (err) {
				return console.log(err);
			}
			const userData = JSON.parse(data)
			userData[user.id] = userData[user.id] || {
				pullsInCycle: 0
			}
			userPullsLastCycle = ++userData[user.id].pullsInCycle

			fs.writeFile('./userdata/userdata.txt', JSON.stringify(userData), 'utf8', err => {
				if (err) return console.log(err);
				console.log(JSON.stringify(userData))
			});
		});

		const luck = Utils.getRandomFloat(0, 100)
		
		let result,
			stars,
			type

		for (const rarity of pulls) {
			if (luck > rarity.minWeight) {
				item = Utils.getRandomItem(rarity.rewards)
				stars = rarity.stars
				type = item.type
				break
			}
		}

		return `You just pulled ${item.name} (**${stars}-star ${type}**)! Luck = ${Math.floor(luck)}`

	}
}