const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Stufz. Do $cmds');
	console.log('Presence Changed.');
	console.log('-------');
	
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

client.on('message', msg => {
	if (msg.content === '$fetchrole') {
		bot.on('guildMemeberAdd',(member) => { member.addRole("366256286922178560").catch(console.error);
	});
	}
});

client.login('token');
