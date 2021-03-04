const config = require('../config.json')
const Main  = require(`./main.js`)

const gachaBot = new Main(config)

gachaBot.run()