const { Utils }  = require(`../utils.js`)
const User  = require(`../user.js`)
const Discord = require('discord.js')

module.exports = {
	name: `pull`,
	description: `pulls a random item or character from wishes.js`,
	execute: () => {
		console.log("PULLED")
	}
}