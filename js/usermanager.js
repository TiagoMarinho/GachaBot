module.exports = class UserManager {
	constructor () {
		this.users = []
	}
	getUser (id) {
		return this.users.find(u => u.id === id)
	}
	addChild (user) {
		this.users.push(user)
	}
}