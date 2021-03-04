const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('../config.json')
const Main  = require(`./main.js`)

const gachaBot = new Main(config)

client.once('ready', () => {
	console.log('Ready!')

	gachaBot.run()
})

client.on('message', message => {
	gachaBot.commandResponseHook(message)
});

client.login(config.token)