const Discord = require("discord.js");
var auth = require('./auth.json');
var userListJson = require('./userList.json');
var fs = require('fs');
const bot = new Discord.Client();

bot.login(auth.token);

bot.on("ready", () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
});


bot.on("message", (message) => {
    var args;
	var cmd;
	if (message.content.indexOf('-') === 0)
	{
		args = message.content.slice(1).trim().split(/ +/g);
		cmd = args.shift();
	}
	
	switch(cmd) 
	{
		case 'ping':
			message.channel.send("pong").then(msg => {msg.delete(10000)});
			break;
	}
});
