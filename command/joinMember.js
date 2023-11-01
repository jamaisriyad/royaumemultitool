const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })
const config = require('../config')

module.exports = async (client, message) => {
    const muter = message.mentions.users.first();
    if (!message.member.permissions.has('MOVE_MEMBERS')) {
        var msg = await message.reply("Vous n'avez pas la permission de move pour effectuer cette action.")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    if (muter === undefined) {
        var msg = await message.reply("Vous n'avez pas mentionné de membre.")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    let guild = client.guilds.cache.get(config.guild)
    let member = (guild.members.cache.find(member => member.id === muter.id));
    let m = (guild.members.cache.find(member => member.id === client.user.id));
    if (member.voice.channel && m.voice.channel) {
        const channelId = member.voice.channel.id;
        await m.voice.setChannel(channelId)
        setTimeout(() => message.delete(), 1000);
        return;
    } else {
        if (!member.voice.channel) {
            var msg = await message.reply(`Il n'est pas dans un channel vocal.`);
            setTimeout(() => message.delete(), 1000);
            setTimeout(() => msg.delete(), 4000);
            return;
        } else if (!m.voice.channel) {
            var msg = await message.reply(`Vous n'êtes pas dans un channel vocal.`);
            setTimeout(() => message.delete(), 1000);
            setTimeout(() => msg.delete(), 4000);
            return;
        } else {
            setTimeout(() => message.delete(), 1000);
            return;
        }
    }
}