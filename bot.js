const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Logged in as ${client.user.tag}!');
	bot.user.setPresence({status: 'online', game: { name: 'Stufz. Do $cmds'} });
	
});

client.on('message', msg => {
	if (msg.content === '$ping') {
		msg.reply('No pinging.');
	}
});

client.on('message', msg => {
	if (msg.content === '$ding') {
		msg.reply('Dong!');
	}
});

client.on('message', msg => {
	if (msg.content === '$cmds') {
		msg.reply('Visit the documentation on our site for more info: http://docs.mikuchan.me');
	}
});

client.on('message', msg => {
	if (msg.content === '$icup') {
		msg.reply('Ha ha. Very funny. ***(not)***.');
	}
});



client.login('MzY1NjQ5OTE4MTQyMDU0NDEw.DLkWlw.bANvZcyQXhYWXvxg5pvHBflAuss');