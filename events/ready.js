const Discord = require('discord.js')

module.exports = async (client) => {
  


  async function createApiMessage(interaction, content){
    const apiMessage = await APIMessage.create(client.channels.resolve(interaction.channel_id), content)
    .resolveData()
    .resolveFiles()

    return { ...apiMessage.data, files : apiMessage.files };

}
  const array = [
  {
    name:'m!help for comms',
    type:'WATCHING'
  },
    {
    name:'coding',
    type:'PLAYING'
  },
    
    {
    name:'fortnite',
    type:'PLAYING'
  },
      {
    name:'sad',
    type:'PLAYING'
  },
  {
    name:'version 3.3',
    type:'PLAYING'
  },
  {
   name:'logs.',
   type:'STREAMING'
  },
  {
    name:'xd idk',
    type:'PLAYING'
  },
  {
    name:`to ${client.guilds.cache.size} servers`,
    type:'LISENTING'
  },
  {
    name:`to ${client.users.cache.size} users`,
    type:'WATCHING'
  },
  {
   name:'3.4 soon',
   type:'WATCHING'
  },
  {
    name:'plis invite me',
    type:'STREAMING',
    url: 'https://twitch.tv/eitanmdk'
  }
  ]
  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'Online',
        activity: array[Math.floor(Math.random() * array.length)]  
});
    }

    presence();
  }, 7000)

console.log('si estoy online !!!!')
const discordem = new Discord.MessageEmbed()
.setDescription("The restart has finished")
.setColor("RANDOM")
client.channels.cache.get("824630817665056849").send(discordem)

}



