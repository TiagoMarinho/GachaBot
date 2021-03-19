const Utils = require(`../utils.js`)
const User = require(`../user.js`)
const Gacha = require(`../gacha.js`)
const Discord = require('discord.js')
const config = require(`../../config.json`)


module.exports = class Wish {
    static name = `wish`
    static description = `Add a character to your !wishlist so you can be mentioned.`
    constructor(gacha) {
        this.gacha = gacha
    }

    execute(message, args, user) {
        const discordjsUser = message.author,
            channel = message.channel
        if (typeof args[0] === `undefined`)
            return message.channel.send(`Use: **!wish** <character>\nEffect: you will be mentioned when the character spawns.`)

        let name = ``
        for (const arg of args) {
            name += `${arg}`
        }
        const result = this.gacha.getRewardByName(name)
        if (!result)
            return message.channel.send(`no results found for "${name}"!`)
        const reward = result,
            rarity = this.gacha.rarities.find(rarity => rarity.stars === reward.stars), // could be done through index too
            stars = rarity.stars,
            type = reward.constructor.name,
            worth = reward.worth,
            image = reward.image || `https://i.imgur.com/fndBsb9.png`

        if (user.inventory.wishes.find(wish => wish === reward)) {
            return message.reply(`${reward.name} already exists in your wishlist`)
        }
        console.log(`${user.name} added "${name}" to wishlist`)

        user.inventory.wishes.push(reward)
        const embedMessage = new Discord.MessageEmbed()
            .setColor(rarity.color)
            .setTitle(reward.name)
            .setAuthor(`${reward.name} was added to your wishlist`, discordjsUser.avatarURL(), ``)
            .setDescription(reward.series || "")
            .addFields({
                name: `Value`,
                value: `$${worth}`,
                inline: true
            }, {
                name: `Type`,
                value: reward.constructor.name,
                inline: true
            }, {
                name: `Rarity`,
                value: `:star:`.repeat(stars),
                inline: true
            }, )
            .setImage(image)

        channel.send(embedMessage)
    }
}