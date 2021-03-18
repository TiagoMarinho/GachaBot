const Reward = require(`./reward.js`)
module.exports = class Character extends Reward {
	constructor (name, stars, worth, series, image) {
		super(name, stars, worth, image)
		this.series = series
		this.duplicateString = "Constelations"
	}
}