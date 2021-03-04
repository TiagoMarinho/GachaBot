class Banner {
	constructor (pity = 90) {
		this.rewards = []
		this.pityByUser = {}
		this.pity = pity
	}
	pull (user) {
		if (typeof this.pityByUser[user] === `undefined`)
			this.pityByUser[user] = 0

		++this.pityByUser[user]

		
	}
}