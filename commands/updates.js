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
    .addField('3.3', 'Fixed problem with help, new command !!! `m!dep` and i update `m!av` now you can mention, 3 new commands more !!! `m!commands` `m!servers`, `m!users` and new IMPLEMENT **LOGS**!!!! `m!setlogs` for the new logs system GGs and `m!punch` command, and a new command `m!serverinfo`')
      client.channels.cache.get("825138580321075220").send(embed)

    }
}
