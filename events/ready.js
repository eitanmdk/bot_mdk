const Discord = require('discord.js')

module.exports = async (client, message) => {

  
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
    name:'version 2.9',
    type:'PLAYING'
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
    name:'plis invite me',
    type:'STREAMING',
    url: 'https://twitch.tv/eitanmdk'
  }
  ]
  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'dnd',
        activity: array[Math.floor(Math.random() * array.length)]  
});
    }

    presence();
  }, 7000)

console.log('si estoy online !!!!')
for (const file of commandFiles) {
  console.log(`loading ${file}`);
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
}