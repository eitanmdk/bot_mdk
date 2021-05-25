const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "egg",
  alias: [],

execute (client, message, args){
  
const embed = new Discord.MessageEmbed()
    .setDescription('image of a egg')
    .setTimestamp()
    .setTitle('egg')
    .setImage('https://static01.nyt.com/images/2019/02/05/world/05egg/15xp-egg-promo-articleLarge-v2.jpg?quality=75&auto=webp&disable=upscale')
    message.channel.send(embed)

 }
}




