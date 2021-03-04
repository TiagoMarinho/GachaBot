
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


	///////////////////////////

	exports.wishes = {
	legendary: {
		name: `legendary`,
		color: `#ffc300`,
		minWeight: 99,
		stars: 5,
		rewards: {
			characters: [
			],
			items: [
			]
		}
	},
	epic: {
		name: `epic`,
		color: `#9000ff`,
		minWeight: 96,
		stars: 4,
		rewards: {
			characters: [
			],
			items: [
			]
		}
	},
	rare: {
		name: `rare`,
		color: `#0099ff`,
		minWeight: 83,
		stars: 3,
		rewards: {
			characters: [
			],
			items: [
			]
		}
	},
	uncommon: {
		name: `uncommon`,
		color: `#54b768`,
		minWeight: 75,
		stars: 2,
		rewards: {
			characters: [
			],
			items: [
			]
		}
	},
	common: {
		name: `common`,
		color: `#888888`,
		minWeight: 0,
		stars: 1,
		rewards: {
			characters: [
			],
			items: [
			]
		}
	}
}