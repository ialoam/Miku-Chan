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

lient.on('message', msg => {
	if (msg.content === '$fetchrole') {
		console.log(message.member + 'has prompted for a role');
		if(message.member.roles.has("366256286922178560")) {
			console.log(message.member + 'was not given a role. Reason: Already Have It');
			msg.reply('Sorry, you already have the needed rank.');
		} else {
			console.log(message.member + "was given a role.);
			member.addRole('366256286922178560').catch(console.error);
			msg.reply('Fine. Take your stupid role.');
		} else if discord.Forbidden {
			console.log(message.member + 'was not given a role. Reason: Not Enough Privilages');
			msg.reply('Sorry. I need ***MANAGE_GUILDS*** to do this.');
		}
	}
});

client.login('token');
