const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })
const config = require('../config')
var fs = require('fs')

module.exports = async (client, message) => {
    if (config.bypassAllCommand == "false") {
        var msg = await message.reply("Cette commande a été désactivé, pour l'activer veuillez remplacer la ``false`` par ``true`` dans le fichier config.js à la ligne ``bypassAllCommand``")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    if (!message.member.permissions.has('MOVE_MEMBERS')) {
        var msg = await message.reply("Vous n'avez pas la permission de move pour effectuer cette action.")
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
    let guild = client.guilds.cache.get(config.guild)
    let m = (guild.members.cache.find(member => member.id === client.user.id));
    if (m.voice.channel) {
        var msg = await message.reply(`Allez dans un channel, je mooverai tout le monde une fois là-bas.`);
        setTimeout(() => message.delete(), 1000);
        fs.readFile('./moove.json', 'utf-8', function (err, data) {
            if (err) throw err
            var arrayOfObjects = JSON.parse(data)
            arrayOfObjects["prochainmoove"] = `${m.voice.channel.id}:${msg.id}:${msg.channel.id}`
            fs.writeFile('./moove.json', JSON.stringify(arrayOfObjects, null, 4), 'utf-8', function (err) {
                if (err) throw err
            })
        })
        return;
    } else {
        var msg = await message.reply(`Vous n'êtes pas dans un channel vocal.`);
        setTimeout(() => message.delete(), 1000);
        setTimeout(() => msg.delete(), 4000);
        return;
    }
}