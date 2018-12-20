const Discord = require("discord.js");
var auth = require('./auth.json');
var userListJson = require('./userList.json');
var fs = require('fs');
const bot = new Discord.Client();

bot.login(auth.token);

//on bot start
bot.on("ready", () => {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(bot.username + ' - (' + bot.id + ')');
	
	//in case of restart. we need to push now time to the json for all users. 
	resetTimes();
	
});

//we need to push now time to the json for all users. 
function resetTimes()
{
	for(var i=0; i<userListJson.userList.length; i++)
	{
		userListJson.userList[i].timeLastMessage = Date.now();
		userListJson.userList[i].timeJoinChannel = Date.now();
	}
}

//on message receive
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
		case 'time':  //check the time spent in voice channels
			var index = indexUserInJSON(message.member);  //index of user in the json, if not found the user is pushed to it. 
			//in a voice channel, and its on the server were typing the command and not in the afk channel. 
			if(message.member.voiceChannel !== undefined && message.member.voiceChannel.guild === message.guild && message.member.voiceChannelID !== message.member.guild.afkChannelID)
			{
				//force update the timer.
				setVoiceTimeTotal(message.member);
			}
			
			message.channel.send(readTime(userListJson.userList[index].voiceTime/1000));
			break;
	}
});

//convert seconds into readable time. 
function readTime(seconds)
{
	var days = Math.floor(seconds/ (3600*24));
	seconds  -= days*3600*24;
	var hrs   = Math.floor(seconds / 3600);
	seconds  -= hrs*3600;
	var mnts = Math.floor(seconds / 60);
	seconds  -= mnts*60;
	seconds = Math.floor(seconds);
	return "You have spent " + days+" days, "+hrs+" Hrs, "+mnts+" Minutes, "+seconds+" Seconds" + " in voice"
}

//when a voice channel is updated.
bot.on('voiceStateUpdate', (oldMember, newMember) => {

  if(joinedChannel(oldMember, newMember) && !toAFK(oldMember, newMember))//joining a channel thats not the AFK   		**start
  {
	console.log("joined " + newMember.voiceChannel.name + " in server " + newMember.guild.name);
	setVoiceJoinTime(newMember);  //push join time to json for that user
  }
  else if(movedChannel(oldMember, newMember) && toAFK(oldMember, newMember))//moved from a channel to the AFK channel 	**stop
  {
	console.log("moved from " + oldMember.voiceChannel.name + " in server " + oldMember.guild.name + " to " + newMember.voiceChannel.name + "in server " + newMember.guild.name);
	setVoiceTimeTotal(oldMember);  //calculate time spent in voice channels
  }
  else if(movedChannel(oldMember, newMember) && fromAFK(oldMember, newMember))//moved from AFK to a channel  			**start
  {
	console.log("moved from " + oldMember.voiceChannel.name + " in server " + oldMember.guild.name + " to " + newMember.voiceChannel.name + "in server " + newMember.guild.name);
	setVoiceJoinTime(newMember);  //push join time to json for that user
  }
  else if(leftChannel(oldMember, newMember) && !fromAFK(oldMember, newMember))//left channel thats not AFK. 			**stop
  {
	console.log("left " + oldMember.voiceChannel.name + " in server " + oldMember.guild.name);
	setVoiceTimeTotal(oldMember);  //calculate time spent in voice channels
  }
});


function joinedChannel(oldMember, newMember)//did user join a voice channel
{
	if(oldMember.voiceChannel === undefined && newMember.voiceChannel !== undefined)
	{
		return true;
	}
	return false;
}

function leftChannel(oldMember, newMember)//did user leave a voice channel
{
	if(oldMember.voiceChannel !== undefined && newMember.voiceChannel === undefined)
	{
		return true;
	}
	return false;
}

function movedChannel(oldMember, newMember) //did the user move voice channels
{
	if(oldMember.voiceChannel !== undefined && newMember.voiceChannel !== undefined && oldMember.voiceChannel != newMember.voiceChannel)
	{
		return true;
	}
	return false;
}

function toAFK(oldMember, newMember)//did user join the AFK channel
{
	if(newMember.voiceChannelID === newMember.guild.afkChannelID)
	{
		return true;
	}
	return false;
}

function fromAFK(oldMember, newMember) //did user leave the AFK channel
{
	if(oldMember.voiceChannelID === oldMember.guild.afkChannelID)
	{
		return true;
	}
	return false;
}

function indexUserInJSON(user) //finds user in JSON, if it cant find it it pushes the user to the json
{
	for(var i=0; i<userListJson.userList.length; i++) //each user in json
	{
		if(userListJson.userList[i].guildID === user.guild.id && userListJson.userList[i].userID === user.id) //need to match guildId and userID
		{
			return Number(i);
		}
	}
	var pushUser = {"guildID":user.guild.id,"userID":user.id,"timeLastMessage":Date.now(),"messageCount":0,"timeJoinChannel":Date.now(),"voiceTime":0}; //if not found then push it
	userListJson.userList.push(pushUser);
	fs.writeFile('./userList.json', JSON.stringify(userListJson), function (err) {if (err) return console.log(err);}); //write to json
	return Number(i); //push is at the end of file thus just i is the index
}


function setVoiceJoinTime(newMember)  //sets the join time in json for user.
{
	console.log("updating the join time.");
	var index = indexUserInJSON(newMember);  //get index in json
	console.log("found at index " + index);
	userListJson.userList[index].timeJoinChannel = Date.now();  //set join time to now
	console.log(userListJson.userList[index].timeJoinChannel);
	fs.writeFile('./userList.json', JSON.stringify(userListJson), function (err) {if (err) return console.log(err);}); // write to file. 
}

function setVoiceTimeTotal(oldMember)  //calculates time in voice for user.
{
	console.log("updating the time toal.");
	var index = indexUserInJSON(oldMember);  //get index in json
	console.log("found at index " + index);
	userListJson.userList[index].voiceTime += Date.now() - userListJson.userList[index].timeJoinChannel;  //calculate time by subtracting join time from now time.
	userListJson.userList[index].timeJoinChannel = Date.now(); //update the joinChannelTime because of the force update with "-time" command
	console.log(userListJson.userList[index].voiceTime);
	fs.writeFile('./userList.json', JSON.stringify(userListJson), function (err) {if (err) return console.log(err);});  //write to file. 
}



