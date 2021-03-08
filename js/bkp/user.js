const fs = require('fs');

class User {
	constructor (user) {
		this.user = user
		this.userData = {}
		this.inventory = []
	}
}
module.exports = User