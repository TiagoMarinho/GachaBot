const Utils = require(`../../utils.js`)
const fs = require('fs')
const path = require('path');
const config = require(`../../../config.json`)
const Discord = require('discord.js')
const Command = require('../../command.js')

module.exports = class Help extends Command {
	name = `help`
	description = `Provides instructions on how to use this bot`
	expects = {
		message: true,
		args: true,
		commands: true
	}
	constructor () {
		super()
	}
	execute (message, args, commands) {
		console.log(commands)
	}
}