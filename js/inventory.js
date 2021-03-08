class Inventory {
	constructor () {
		this.items = []
		this.characters = []
		this.gold = 0
	}
	getAllRewards () {
		return [...this.items, ...this.characters]
	}
	addReward (...rewards) {
		for (const reward of rewards) {
			switch (typeof reward) {
				case `Character`:
					this.characters.push(reward)
					break;
				case `Item`:
					this.items.push(reward)
					break;
			}
		}
	}
}