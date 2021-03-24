const Discord = require(`discord.js`)

module.exports = class Client {
	#client = new Discord.Client()
	commands = []
	login (token) {
		this.#client.login(token)
	}
	addEventListener (event, callback) {
		this.#client.on(event, callback)
	}
}