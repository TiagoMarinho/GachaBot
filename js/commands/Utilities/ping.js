const Command = require('../../command.js')
module.exports = class Ping extends Command {
	name = `ping`
	description = `Answers with pong`
	constructor () {
		super()
	}
	execute (message) {
		message.channel.send(`pong`)
	}
}