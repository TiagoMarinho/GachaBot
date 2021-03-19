const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)


module.exports = class Wishlist {
    static name = `wishlist`
    static description = `Shows user wishlist`
    constructor() {}

    execute(message, args, user) {
        const discordjsUser = message.author,
            channel = message.channel
        const embedMessage = new Discord.MessageEmbed()
            .setColor('#888888')
            .setAuthor(`${user.name}'s wishlist`, discordjsUser.avatarURL(), ``)
        for (const wish of user.inventory.wishes) {
            embedMessage.addFields({
                name: wish.name,
                value: `$${wish.worth}`,
                inline: false
            }, )
        }
        channel.send(embedMessage)
    }
}