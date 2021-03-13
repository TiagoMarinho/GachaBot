const Character = require("./character.js")
const Item = require("./item.js")
const Rarity = require("./rarity.js")

/*
 * This class generates a very specific-looking monolithic object
 * that is probably a missed abstraction.
 * Work towards abstracting it to its own class is needed.
 */

module.exports = class WishParser {
	mapRarities (rawData) {
		const rarities = rawData.map(rarity => new Rarity(
			rarity.name,
			rarity.color,
			rarity.stars,
			rarity.minWeight
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
			reward.series,
			reward.image
		))

		return rewards
	}
	assignRewardsToRarities (rarities, rewards) {
		for (const reward of rewards) {
			const rarityIndex = reward.stars - 1,
				rewardType = reward instanceof Character ? "characters" : "items", // this feels wrong
				rarity = rarities[rarityIndex]

			rarity.rewards[rewardType].push(reward)
			reward.rarity = rarity
		}
		return rarities
	}
	parseWishList (raritiesRawData, rewardsRawData) {
		const rarities = this.mapRarities(raritiesRawData),
			rewards = this.mapRewards(rewardsRawData)

		return this.assignRewardsToRarities(rarities, rewards)
	}
}