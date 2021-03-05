const Reward = require(`./reward.js`)
module.exports = class Item extends Reward {
	constructor (name, stars) {
		super(name, stars)
		this.duplicateString = "Refinement"
	}
}