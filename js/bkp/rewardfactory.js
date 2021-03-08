const rarities = [
	{name: `Legendary`, minWeight: 99, stars: 5, color: `#ffc300`},
	{name: `Epic`, minWeight: 96, stars: 4, color: `#9000ff`},
	{name: `Rare`, minWeight: 83, stars: 3, color: `#0099ff`},
	{name: `Uncommon`, minWeight: 75, stars: 2, color: `#54b768`},
	{name: `Common`, minWeight: 0, stars: 1, color: `#888888`},
]
rarities.map(rarity => new Rarity(
	rarity.name,
	rarity.minWeight,
	rarity.stars,
	rarity.color,
))
wishes.map(reward => new reward.type(
	reward.name
))