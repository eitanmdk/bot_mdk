client.on('message', message => {
  if(message.content === prefix + "ping") {
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.sendMessage("Your ping is " + `${Date.now() - message.createdTimestamp}` + "ms");
  }
});