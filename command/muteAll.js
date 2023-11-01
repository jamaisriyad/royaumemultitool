const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })
const config = require('../config')

module.exports = async (client, message) => {
    if (config.bypassAllCommand == "false") {
        var msg = await message.reply("Cette commande a été désactivé, pour l'activer veuillez remplacer la ``false`` par ``true`` dans le fichier config.js à la ligne ``bypassAllCommand``")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    if (!message.member.permissions.has('MUTE_MEMBERS')) {
        var msg = await message.reply("Vous n'avez pas la permission de mute pour effectuer cette action.")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    let guild = client.guilds.cache.get(config.guild)
    let m = (guild.members.cache.find(member => member.id === client.user.id));
    if (m.voice.channel) {
        const cha = guild.channels.cache.get(m.voice.channel.id)
        cha.members.map((member) => {
            if(member.id != client.user.id)
            member.voice.setMute(1)
        })
        var msg = await message.reply(`Tout le monde a été mute.`);
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    } else {
        var msg = await message.reply(`Vous n'êtes pas dans un channel vocal.`);
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
}