
const Discord = require ('discord.js');
const { Client, MessageEmbed  } = require ('discord.js');
const { inspect } = require ('util')



module.exports = {
  name: "eval" , 
  alias: ["e"] ,


execute (client, message, args){

  if(message.author.id !== '547953269918400515') return message.channel.send('u cant use this command dum dum only the creator')

 const command = args.join(" ")
 if(!command) return message.channel.send("debes escribir un comando")

 try {
 const evaled = eval(command)
 let palabras = ["token", "destroy", "process"]
 if(palabras.some(word => message.content.toLowerCase().includes(word))){
   return message.channel.send("no se permiten esas palabras")
 }
 const embed = new Discord.MessageEmbed()  
 .setColor('GREEN')  
 .setTitle('evaluado!')
 .addField(`**tipo**`, `\`\`\`prolog\n${typeof(evaled)}\`\`\``, true)
 .addField('**EVALUADO EN**', `\`\`\`yaml\n${Date.now() - message.createdTimestamp}ms\`\`\``, true)
 .addField(`**ENTRADA**`, `\`\`\`\n${command}\`\`\``)
 .addField(`**SALIDA**`, `\`\`\`js\n${inspect(evaled, {depth: 0})}\`\`\``)

 message.channel.send(embed)
 } catch (error) {
  
const embedfallo = new Discord.MessageEmbed()
.setColor('RED')
.addField(`**ENTRADA**`, `\`\`\`js\n${command}\`\`\``)
.addField(`**ERROR**`, `\`\`\`js\n${error}\`\`\``)

message.channel.send(embedfallo)
   }

  }

 }

