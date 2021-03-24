const Discord = require(`discord.js`)

module.exports = class Client {
	constructor () {
		this._client = new Discord.Client()
	}
	login (token) {
		this._client.login(token)
	}
	addEventListener (event, callback) {
		this._client.on(event, callback)
	}
}