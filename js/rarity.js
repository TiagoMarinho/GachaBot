module.exports = class Rarity {
	constructor (name, color, stars, minWeight) {
		this.name = name
		this.color = color
		this.stars = stars
		this.minWeight = minWeight
		this.rewardsByType = {
			characters: [], 
			items: []
		}
	}
	get rewards () {
		return [
			...this.rewardsByType.characters, 
			...this.rewardsByType.items
		]
	}
}