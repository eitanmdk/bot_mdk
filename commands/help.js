const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "help",
  alias: [],

execute (client, message, args){
const help = args.join(" ")

  const embed = new Discord.MessageEmbed()
    .setColor('#1BEC0A')
    .setThumbnail(message.author.displayAvatarURL())
    .setTimestamp()
    .setTitle('COMMANDS OF THE BOT')
    .setDescription('prefix `m!`')
    .addField('fun', '`m!fun`')
    .addField('econommy', '`m!economy`')
    .addField('others', '`m!others`')
    .addField('random', '`m!random`')
    .addField('moderation', '`m!moderation`')
    .addField('music', 'm!music')
    message.channel.send(embed)

 }
}