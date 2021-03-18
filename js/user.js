const Inventory = require('./inventory.js')

module.exports = class User {
	constructor (name, id) {
		this.name = name
		this.id = id
		this.inventory = new Inventory(this)
	}
}