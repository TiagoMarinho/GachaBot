module.exports = class Command {
	name = ``
	description = ``
	aliases = []
	expects = {
		message: true,
		args: true,
		commands: false
	}
	execute (message) {

	}
}