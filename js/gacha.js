const Utils = require(`./utils.js`)
const WishParser = require(`./wishparser.js`)

module.exports = class Gacha {
	constructor (raritiesFile, rewardsFile) {
		this.wishList = this.getWishListFromJSONFile(raritiesFile, rewardsFile)
	}
	getWishListFromJSONFile (raritiesFile, rewardsFile) {
		const parser = new WishParser(),
			raritiesRawData = require(raritiesFile),
			rewardsRawData = require(rewardsFile)

		return parser.parseWishList(raritiesRawData, rewardsRawData)
	}
	pull () {
		const luck = Utils.getRandomFloat(0, 1),
			rarity = this.getPullRarity(luck),
			isCharacter = rarity.stars > 2 ? Utils.getRandomBool() : false,
			reward = this.getPullReward(rarity, isCharacter)

		return [reward, rarity, {luck: luck, isCharacter: isCharacter}]
	}
	getPullRarity (luck) {
		for (const rarity of this.wishList) {
			if (luck > rarity.minWeight) {
				return rarity
			}
		}
	}
	getPullReward (rarity, isCharacter) {
		const type = isCharacter ? `characters` : `items`
		return Utils.getRandomItem(rarity.rewards[type])
	}
}