const Reward = require(`./reward.js`)
module.exports = class Character extends Reward {
	constructor (name, stars, series) {
		super(name, stars)
		this.series = series
		this.duplicateString = "Constelations"
	}
}