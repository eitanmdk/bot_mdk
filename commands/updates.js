const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "recentupdate" , 
  alias: [] ,


execute (client, message, args){

  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

 const command = args.join(" ")

  
  const embed = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setThumbnail('https://media.giphy.com/media/5wWf7HapUvpOumiXZRK/giphy.gif')
  .setTimestamp()
    .addField('2.81', 'made some commands on spanish to english nothing else xD *small updates*')
      message.channel.send(embed)

    }
}
