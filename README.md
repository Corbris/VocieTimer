# VocieTimer
This is a time for your voice calls in discord. using discord.js

guild ID, User ID, TimeLastMessage, TimeJoinChannel, messageCount, time.
Time = Date.now();

each message
	if user is in json
		if TimeLastMessage > 30 seconds
			messageCount++
			TimeLastMessage = current time
	if not in json
		push to json with current time and messages at 1
		

On voice Update. && channel is not the afk channel
	if(oldUserChannel === undefined && newUserChannel !== undefined) //someone joins
		if user is in json
			TimeJoinChannel = current time;
		if not in json
			push to json with current time
	if(newUserChannel === undefined) //someone leaves
		if user is in json
			time = currentTime - TimeJoinChannel
		if not in json
			push to json with full default times

	
