const Reward = require(`./reward.js`)
module.exports = class Item extends Reward {
	constructor (name, stars, worth, image) {
		super(name, stars, worth, image)
		this.duplicateString = "Refinement"
	}
}