const discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
const bug = args.join(" ") 

const reporte = new discord.MessageEmbed()
.setFooter("command made it for : "+message.author.tag)
.setTitle("new suggest")
.addField("server of the suggest", message.guild.name)
.addField("user of the suggest| ID", `${message.author.tag} | ${message.author.id}`)
.addField("Description of the suggest", bug)
.setColor("RANDOM")
.setTimestamp()
bot.channels.cache.get("826469736237629460").send(reporte) 
}