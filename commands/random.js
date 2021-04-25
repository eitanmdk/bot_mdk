  const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "random",
  alias: [],

execute (client, message, args){
const random = args.join(" ")

  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setThumbnail('https://media.giphy.com/media/39CgKFYbkxoId4P6Tt/giphy.gif')
    .setTimestamp()
    .setTitle('RANDOM COMMANDS')
    .addField('dormir', 'with m!dormir says wenas noches')
    .addField('badface', 'with m!badface says a face of a a weird man xD')
    .addField('crow', 'with m!crow says the meme of the crow')
    .addField('tu mama', 'with m!tu mama says jajajajajajajaja')
    .addField('maik wasowski', 'with m!maik wasowski says the meme of mike wasowski')
    .addField('noob', 'with m!noob says the roblox noob')
    message.channel.send(embed)

     }
}