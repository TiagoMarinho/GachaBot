const Reward = require(`./reward.js`)
module.exports = class Item extends Reward {
	constructor (name, stars, image) {
		super(name, stars, image)
		this.duplicateString = "Refinement"
	}
}