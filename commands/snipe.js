const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "snipe",
  alias: [],

async execute (client, message, args){

  const channel = message.mentions.channels.first() || message.channel;
  const msg = client.snipes.get(channel.id)
  if(!msg){
    message.channel.send(`${message.author} there is no message deleted on this channel`)
  }else{
    const embedsniper = new Discord.MessageEmbed()
    .setTitle('SNIPED')
    .setAuthor(`${msg.delete.tag}`, msg.delete.displayAvatarURL())
    .addField('Channel: ', `<#${msg.canal.id}>`)
    .setDescription(msg.content)
    .setColor('RANDOM')
    .setFooter('U were sniped!')
    .setTimestamp()
    message.channel.send(embedsniper);
  }

 }
}