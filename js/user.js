const fs = require('fs');

class User {
	constructor (user) {
		this.user = user
		this.userData = {}
	}
	getStoredData (resolve, reject) {
		fs.readFile(`./userdata/${this.user.id}.json`, 'utf8', (err, data) => {
			if (err) {
				this.userData = {}
				resolve()
				return
			}

			this.userData = JSON.parse(data)
			resolve()
		})
	}
	saveDataToStorage (resolve, reject) {
		fs.writeFile(`./userdata/${this.user.id}.json`, JSON.stringify(this.userData), 'utf8', err => {
			if (err) 
				reject()

			resolve()
		})
	}
}
module.exports = User