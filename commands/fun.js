const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "fun",
  alias: [],

execute (client, message, args){
const fun = args.join(" ")

  const embed = new Discord.MessageEmbed()
    .setColor('#FF8B00')
    .setThumbnail('https://media.giphy.com/media/39CgKFYbkxoId4P6Tt/giphy.gif')
    .setTimestamp()
    .setTitle('COMMANDS OF FUN')
    .addField('meme esp', 'With m!meme says a random meme on spanish')
    .addField('meme eng', 'With m!meme says a random meme on english')
    .addField('mainkra', 'With m!mainkra says a minecraft random meme')
    .addField(`rps`, `Play rock paper scissors`)
    message.channel.send(embed)
  }
}