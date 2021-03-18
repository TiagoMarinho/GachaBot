module.exports = class Inventory {
	constructor (owner) {
		this.owner = owner
		this.items = []
		this.characters = []
		this.gold = 0
	}
	getAllRewards () {
		return [...this.items, ...this.characters]
	}
	addReward (...rewards) {
		for (const reward of rewards) {
			switch (reward.constructor.name) {
				case `Character`:
					this.characters.push(reward)
					break;
				case `Item`:
					this.items.push(reward)
					break;
			}
			console.log(`${reward.constructor.name} "${reward.name}" was added to ${this.owner.name}'s inventory`)
		}
	}
}