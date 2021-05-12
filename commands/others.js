const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "others",
  alias: [],

execute (client, message, args){
const others = args.join(" ")
  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

  const embed = new Discord.MessageEmbed()
    .setColor('#17FF00')
    .setThumbnail('https://www.expertosdecomputadoras.com/wp-content/uploads/2011/12/como%20reiniciar%20un%20trabajo%20en%20unix%20sco.jpg')
    .setTimestamp()
    .setTitle('OTHER COMMANDS')
    .addField('youtube', '`m!youtube` shows my yt')
    .addField('twitch', '`m!twitch` shows my twitch')
    .addField('updates', '`m!changelog` show all the recent updates of the bot')
    .addField('invite', '`m!invite` u can invite the bot to your server')
    .addField(`ping`, `Check the bot's ping`)
    .addField('suggest', 'with `m!suggest` send a suggestion for the bot')
    .addField('say', 'with `m!say` send a message u want only for admins for not raids')
    .addField('report', 'm!report is to report buge')
    .addField('suggest', 'm!suggest is for suggestions for the bot')
    message.channel.send(embed)

 }
}