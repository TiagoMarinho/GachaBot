module.exports = class Subject {
	constructor () {
		this.handlers = []
	}
	subscribe (handler) {
		this.handlers.push(handler)
	}
	unsubscribe (handler) {
		this.handlers = this.handlers.filter(item => item === handler)
	}
	fire (event) {
		for (const handler of this.handlers) {
			handler(event)
		}
	}
}