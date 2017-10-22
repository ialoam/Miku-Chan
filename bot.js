const Discord = require("discord.js");
const { ShardingManager } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const client = new Discord.Client();
const manager = new ShardingManager('bot.js', { totalShards: 2 });
const prefix = config.prefix;

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Stufz. Do $cmds');
	console.log('Presence Changed.');
	console.log('-------');
	manager.spawn();
	manager.on('launch', shard => console.log('Successfully Launched Shard ${shard.id}'));
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
switch(command) {
	case "setprefix":
		let newPrefix = message.content.split(" ").slice(1, 2)[0];
		config.prefix = newPrefix;
		fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	case "ping":
		message.reply('Your expecting me to say Pong, right?');
	break;
	case "ding":
		message.reply('Dong!');
	break;
	case "cmds":
		message.reply('Visit the documentation on our site for more info: http://docs.mikuchan.me');
		break;
	case "icup":
		message.reply('Ha ha. Very funny. ***(not)***.');
		break;
	case "fetchrole":
		if(msg.member.roles.has('366256286922178560')) {
			message.reply('Sorry, you already have the needed rank.');
		} else {
			member.addRole('366256286922178560').catch(console.error);
			message.reply('Fine. Take your stupid role.');
		}
		break;
	case "about":
		if (message.content === '$about') {
			message.channel.send({embed: {
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
		break;
	case "join":
		if (!message.guild) return;
		if (message.member.voiceChannel) {
			message.member.voiceChannel.join()
				.then(connection => {
					message.reply('I\'ve connected successfully. Use $radio or $play (url) to make me sing.');
				})
				.catch(console.log);
		} else {
			message.reply('You need to join a Voice channel first, silly.');
		}
		break;
	case "radio":
		if (message.member.voiceChannel) {
			// Add Radio Feature
		} else {
			message.reply('Uh.. That\'s not supposed to happen');
		}
		break;
	case "stop":
		// Add Stoping Feature
		// Add Voice Leaving Feature
		break;
	case "google":
		let query = args[0];
		message.reply({embed: {
			color: 3447003,
			title: "Your Search",
			url: "https://www.google.com/search?q=${query}",
			description: "Look at your Search Query via Google.",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Powered by Google"
			},
		}});
		break;
	case "logs":
		// Add Identifier for the msg's channel topic
		// if(message.TextChannel.topic === "logs-miku" => {
		//	message.reply('Alrighty! Logs will be sent right here for your reading purposes.');
		// } else {
		//	message.reply('You\'ll need to set the topic to this channel to: ***_`` logs-miku ```_*** for this to work.');
		// }
		break;
};
});
client.login(config.token);
