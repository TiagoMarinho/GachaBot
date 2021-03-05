const Utils = require(`./utils.js`)
module.exports = class Gacha {
	constructor (file) {
		this.wishList = this.getWishListFromJSONFile(file)
	}
	getWishListFromJSONFile (file) {
		return require(file)
	}
	pull () {
		const luck = Utils.getRandomFloat(0, 1),
			isCharacter = Utils.getRandomBool(),
			rarity = this.getPullRarity(luck),
			reward = this.getPullReward(rarity, isCharacter)

		return [reward, rarity, {luck: luck, isCharacter: isCharacter}]
	}
	getPullRarity (luck) {
		for (const rarityName in this.wishList) {
			if (this.wishList.hasOwnProperty(rarityName)) {
				const rarity = this.wishList[rarityName]
				if (luck > rarity.minWeight) {
					return rarity
				}
			}
		}
	}
	getPullReward (rarity, isCharacter) {
		const type = isCharacter ? `characters` : `items`
		return Utils.getRandomItem(rarity.rewards[type])
	}
}