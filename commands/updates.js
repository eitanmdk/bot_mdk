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
    .addField('3.2', 'Rremasterized all the help command and i made some new commands like `m!snipe`, `m!work` and `m!bal` and we re-opened our ECONOMY SYSTEM GGS')
      client.channels.cache.get("825138580321075220").send(embed)

    }
}
