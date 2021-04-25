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
    .addField('3.0', 'THE BEST UPDATE EVER MADE !!!! THE NEW UPDATE COME WITH A NEW MUSIC SYSTEM `m!music` FOR THE COMMANDS NOW U CAN MAKE HOWGAY U ARE WITH `m!howgay` AND U CAN MENTION FOR KNOW HOW THEY GAY ARE ALSO THE `m!hack` COMMAND HAS BECOME YOU CAN NOW HACK PEOPLE WITH MY BOT AND A LOT OF THINGS MORE LIKE SECRET COMMS USE IT AND `m!peter-griffin` COMMAND IS HERE U CAN PUT UR AVATAR OR THE OTHERS AVATAR ON THE FACE OF PETER LOL AND A NEW SYSTEM OF HANDLER HAS BECOME TAKE CARE')
      message.channel.send(embed)

    }
}
