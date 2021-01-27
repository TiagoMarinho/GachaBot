const pullCycle = users => {
	setInterval(_ => {
		const minuteMark = new Date().getMinutes()
		if (minuteMark === 0) {
			for (const user of users) {
				user.userData.pullsThisCycle = 0
			}
		}
	}, 60)
}