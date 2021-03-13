const Reward = require(`./reward.js`)
module.exports = class Character extends Reward {
	constructor (name, stars, series, image) {
		super(name, stars, image)
		this.series = series
		this.duplicateString = "Constelations"
	}
}