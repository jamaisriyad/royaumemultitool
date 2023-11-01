const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })
const config = require('../config')

module.exports = async (client, message) => {
    const muter = message.mentions.users.first();
    if (muter === undefined) {
        var msg = message.reply("Vous n'avez pas mentionné de membre.")
        setInterval(async () => {
            msg.delete();
            message.delete();
        }, 4000);
        return;
    }
    let guild = client.guilds.cache.get(config.guild)
    let member = (guild.members.cache.find(member => member.id === muter.id));
    if (member.voice.channel) {
        const channelId = member.voice.channel.id;
        var msg = await message.reply(`Il est dans le salon vocal : <#${channelId}>`);
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    } else {
        var msg = await message.reply(`Il n'est pas dans un channel.`);
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
}