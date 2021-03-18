const Utils = require(`./utils.js`)
const WishParser = require(`./wishparser.js`)
const Character = require(`./character.js`)
const Item = require(`./item.js`)

module.exports = class Gacha {
	constructor (raritiesFile, rewardsFile) {
		this.rewards = []
		this.rarities = []
	}
	pull (luck = Utils.getRandomFloat(0, 1)) {
		const rarity = this.getPullRarity(luck),
			isCharacter = rarity.stars > 2 ? Utils.getRandomBool() : false,
			reward = this.getPullReward(rarity, isCharacter)

		return [reward, rarity, {luck: luck, isCharacter: isCharacter}]
	}
	getPullRarity (luck) {
		for (const rarity of this.rarities) {
			if (luck >= 1 - rarity.minWeightInverse) {
				return rarity
			}
		}
	}
	getPullReward (rarity, isCharacter) {
		const possibleRewards = this.rewards.filter(reward => {
			const isCorrectType = reward instanceof Character === isCharacter,
				isCorrectRarity = reward.stars === rarity.stars
			return isCorrectRarity && isCorrectType
		})
		return Utils.getRandomItem(possibleRewards)
	}
	getRewardByName (name, caseSensitive = false) {
		name = (caseSensitive ? name : name.toUpperCase())
				.split(` `).join(``)
				
		for (const reward of this.rewards) {
			const rewardName = (caseSensitive ? reward.name : reward.name.toUpperCase())
				.split(` `).join(``)

			if (rewardName === name)
				return reward
		}
		return false
	}
}