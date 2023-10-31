// For probleme or any question : https://t.me/salutcriyad or @jamaisriyad on discord.

// On récupère les packages dont on a besoin, et on récupère le dossier config pour le token.

const { Client } = require('discord.js-selfbot-v13')
const client = new Client({ checkUpdate: false })
const config = require('./config')

process.on("unhandledRejection", err => {
    return console.log(err)
});
process.on("rejectionHandled", err => {
    return console.log(err)
});
process.on("uncaughtException", err => {
    return console.log(err)
});
process.on("uncaughtExceptionMonitor", err => {
    return console.log(err)
});

const moveAll = require("./command/moveAll");
const muteAll = require('./command/muteAll');
const joinMember = require('./command/joinMember');
const findMember = require('./command/findMember');
const kickAll = require('./command/kickAll');
const unmuteAll = require('./command/unmuteAll');

const delay = ms => new Promise(res => setTimeout(res, ms));

client.on("messageCreate", async function (message) {
    if (!message.content || !message || !message.author || !message.author.id || message.author.id !== client.user.id || !message.guildId || message.guildId !== guild) return
    let m = message.content.split(" ")
    if (m[0].toLowerCase() == ".muteall")
    await muteAll(client, message)
    else if (m[0].toLowerCase() == ".moveall")
    await moveAll(client, message)
    else if (m[0].toLowerCase() == ".join")
    await joinMember(client, message)
    else if (m[0].toLowerCase() == ".find")
    await findMember(client, message)
    else if (m[0].toLowerCase() == ".kickall")
    await kickAll(client, message)
    else if (m[0].toLowerCase() == ".unmuteall")
    await unmuteAll(client, message)
})

// Event quand le compte est connecté.
client.on('ready', async () => {
    console.clear()
    console.log('\x1b[32m%s\x1b[0m', `${client.user.tag} est prêt !`);
    console.log('\x1b[31m%s\x1b[0m', `Je répète que je ne suis pas responsable de vos actes, si le Royaume ou Discord veut vous bannir c'est dans leur droit!`);
})


// Connexion au compte.
client.login(config.token);