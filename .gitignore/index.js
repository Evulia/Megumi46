const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = "/"; 

var dispatcher;

//function sendError
function sendError(message, description) {
  message.channel.send({embed: {
      color: 15158332,
      description : ':x: ' + description
  }});
};

// Create an event listener for messages
bot.on('message', message => {
  if (message.content[0] === PREFIX) {
    let splitMessage = message.content.split(" ");
    if (splitMessage[0] === '/yt') {
        if (splitMessage.length === 2)
        {
            if (message.member.voiceChannel)
            {
                message.member.voiceChannel.join().then(connection => {
                  dispatcher = connection.playStream(splitMessage[1]);

                  dispatcher.on('error', e => {
                    console.log(e);
                  });

                  dispatcher.on('end', e => {
                      dispatcher = undefined;
                      console.log('Fin du son');
                  });
                }).catch(console.log);
            }
            else
              sendError(message, "Erreur, vous devez d'abord rejoindre un canal vocal");
        }
        //else
           //sendError(message, "Erreur, vous vous êtes trompé dans votre commande");
           

    }
    if (splitMessage[0] === '/pause') {
      if (dispatcher !== undefined)
          dispatcher.pause();
    }
    if (splitMessage[0] === '/resume') {
      if (dispatcher !== undefined)
          dispatcher.resume();
    }

    if (message.content === '/xivdb' | message.content === '/giphy' | message.content === '/tenor' | message.content === '/tss' | message.content === '/me' | message.content === '/tableflip' | message.content === '/unflip' | message.content === '/shrug' | message.content === '/nick ') {
      return
    }
    if (message.content === '/ping' | message.content === '/Ping' | message.content === '/PING') {
        message.channel.send('Pong !');
    }
    else
      sendError(message, 'Erreur, vous vous êtes trompé dans votre commande');
    }
});

bot.login(process.env.TOKEN);

bot.on('ready', () => {
  bot.user.setPresence({ game: { name: 'Tuer des humains' }, status: 'online ' });  //absent: idle
  console.log('I am ready!');
});
