class UserManager {
	constructor () {

	}
	setProperty (user) {
		let data = this.getUserData(user);
		
	}
	getUserData (user) {
		fs.readFile(`./userdata/${user.id}.json`, 'utf8', function (err, data) {
			if (err)
				return undefined

			return JSON.parse(data)
		})
	}
	setUserData (user, data) {
		fs.writeFile(`./userdata/${user.id}.json`, JSON.stringify(data), 'utf8', err => {
			if (err) 
				return console.log(err)
		})
	}
}
module.exports = UserManager

/*fs.readFile('./userdata/userdata.json', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}
	const userData = JSON.parse(data)
	userData[user.id] = userData[user.id] || {
		pullsInCycle: 0
	}
	userPullsLastCycle = ++userData[user.id].pullsInCycle

	fs.writeFile('./userdata/userdata.json', JSON.stringify(userData), 'utf8', err => {
		if (err) return console.log(err);
		console.log(JSON.stringify(userData))
	});
});*/