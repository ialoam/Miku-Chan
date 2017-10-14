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
		if(msg.member.roles.has('366256286922178560')) {
			msg.reply('Sorry, you already have the needed rank.');
		} else {
			member.addRole('366256286922178560').catch(console.error);
			msg.reply('Fine. Take your stupid role.');
		} else (Discord.Forbidden) {
			msg.reply('Sorry. I need ***MANAGE_GUILDS*** to do this.');
		}
	}
});

client.on('message', msg => {
	if (msg.content === '$about') {
		msg.channel.send({embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatarURL
			},
			title: "Miku-Chan",
			url: "http://mikuchan.me",
			description: "Miku-Chan is a Discord.JS Discord bot made to increase the autonomy of your server.",
			fields: [{
				name: "Some Commands",
				value: "You can put the prefix (which is $) in front of ping, ding, fetchrole, and cmds for some commands."
			},
			{
				name: "Source Code",
				value: "Since Miku-Chan is open-source, you can check the source [here](http://github.com/Incrested/Miku-Chan)."
			},
			{
				name: "Acknowledgments",
				value: "We love to acknowledge the people who worked on this. So, check the source code above and visit the README.md file."
			}
			],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Miku-Chan"
			}
		}});
	}
	
});

client.login('token');
