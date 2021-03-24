module.exports = class Command {
	name = ``
	description = ``
	aliases = []
	constructor () {
		this.args = {
			message: true
		}
	}
	execute (message) {

	}
}