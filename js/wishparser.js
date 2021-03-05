const Character = require("./character.js")
const Item = require("./item.js")
const Rarity = require("./rarity.js")

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
			reward.series
		))

		return rewards
	}
	assignRewardsToRarities (rarities, rewards) {
		for (const reward of rewards) {
			const rarityIndex = rarities.length - reward.stars,
				rewardType = reward instanceof Character ? "characters" : "items"

			rarities[rarityIndex].rewards[rewardType].push(reward)
		}
		return rarities
	}
	parseWishList (raritiesRawData, rewardsRawData) {
		const rarities = this.mapRarities(raritiesRawData),
			rewards = this.mapRewards(rewardsRawData)

		return this.assignRewardsToRarities(rarities, rewards)
	}
}