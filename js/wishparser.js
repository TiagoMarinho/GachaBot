const Character = require("./character.js")
const Item = require("./item.js")
const Rarity = require("./rarity.js")

module.exports = class WishParser {
	mapRarities (rawData) {
		const rarities = rawData.map(rarity => new Rarity(
			rarity.name,
			rarity.color,
			rarity.stars,
			rarity.minWeightInverse
		))

		return rarities
	}
	mapRewards (rawData) {
		const rewardTypes = {
			"Character": Character,
			"Item": Item
		}

		const rewards = rawData.map(reward => new rewardTypes[reward.type](
			reward.name,
			reward.stars,
			reward.worth,
			reward.series,
			reward.image
		))

		return rewards
	}
}