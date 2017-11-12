const Discord = require("discord.js");
const fs = require("fs");
const yt = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;
const newusers = [];
const guild = member.guild;
const userlist = newUsers[guild.id].map(u => u.toString()).join(" ");

var joinlogging = false;

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Stufz. Do $cmds');
	console.log('Presence Changed.');
	console.log('-------');
});

client.on('guildMemberAdd', (member) => {
	if(joinlogging = true) {
		if(!newUsers[guild.id]) newUsers.[guild.id] = new Discord.Collection;
		newUsers[guild.id].set(member.id, member.user);
		if (newUsers[guild.id].size > 10) {
    			guild.channels.get(guild.id).send("Welcome our new users!\n" + userlist);
    			newUsers[guild.id].clear();
  		}
	}
});
	  
client.on('guildMemberRemove', (member) => {
	if(joinlogging = true) {
		if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
	}
});
	
client.on('message', message => {
	if(!message.content.startswith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
switch(command) {
	case "memes":
		message.channel.createWebhook("Miku-Chan", "https://mikuchan.me/web-icon.png")
		.then(webhook => webhook.edit("Miku-Chan", "https://mikuchan.me/web-icon.png")
		.then(wb => message.author.send(`Take the Webhook URL and put it in the IFTTT recipe below: https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))
		.then(message.author.send("https://ifttt.com/applets/64900568d-the-daily-memer-integration-for-miku-chan");
	break;
	case "setprefix":
		let newPrefix = message.content.split(" ").slice(1, 2)[0];
		config.prefix = newPrefix;
		fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	break;
	case "ping":
		message.reply('Your expecting me to say Pong, right?');
	break;
	case "ding":
		message.reply('Dong!');
	break;
	case "cmds":
		message.reply('Visit the documentation on our site for more info: http://docs.mikuchan.me/commands');
		break;
	case "icup":
		message.reply('Ha ha. Very funny. ***(not)***.');
		break;
	case "fetchrole":
		if(message.member.roles.has('366256286922178560')) {
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
		queue[message.guild.id].playing = false;
		message.member.voiceChannel.leave();
		break;
	case "play":
		if(queue[message.guild.id] === undefined) return message.channel.sendMesssage(`Add some songs to the queue first using ${config.prefix}add`);
		if(!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
		if(queue[message.guild.id].playing) return message.channel.sendMessage('I\'m already streaming music to you. Find a better use of me later.');
		let dispatcher;
		queue[message.guild.id].playing = true;
		(function play(song) {
			if(song === undefined) return message.channel.sendMessage('Queue is kind of empty. Fix that dude.').then(() => {
				queue[message.guild.id].playing = false;
				message.member.voiceChannel.leave();
			});
			message.channel.sendMessage(`Playing: ***${song.title}*** as requested by ***${song.requester}***`);
			dispatcher = message.guild.voiceConnection.playStream(yt(song.url { audioonly: true }), { passes: tokens.passes });
			let collector = message.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(config.prefix + 'pause')) {
					msg.channel.sendMessage('Paused Song.').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(config.prefix + 'resume') {
					message.channel.sendMessage('Resumed Song.').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(config.prefix + 'skip') {
					message.channel.sendMessage('Skipped Song.').then(() => {dispatcher.end();});
				} else if (m.content.startsWith(config.prefix + 'time') {
					message.channel.sendMessage(`Time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000)} : {$(Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[message.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return message.channel.sendMessage('Umm. We\'ve got an issue.').then(() => {
					collector.stop();
					play(queue[message.guild.id].songs.shift());
				});
			});
		})(queue[message.guild.id]songs.shift());
		break;
	case "queue":
		if(queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add songs to the queue using ${config.prefix}add`);
		let tosend = [];
		queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ${song..title} - Requested by: ${song.requester}`);});
		msg.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
		break;
	case "add": 
		let url = message.content.split(' ')[1];
		if (url == '' || url === undefined) return message.channel.sendMessage(`You must add a YouTube video URL or ID after ${config.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return message.channel.sendMessage('Invalid YouTube URL/ID: ' + err);
			if(!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[message.guild.id].songs.push({url: url, title: info.title, requester: message.author.username});
			message.channel.sendMessage(`Added ***${info.title}*** to the queue.`);
		});
	case "google":
		let query = args[0];
		message.reply({embed: {
			color: 3447003,
			title: "Your Search",
			url: `https://www.google.com/search?q=${query}`,
			description: "Look at your Search Query via Google.",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Powered by Google"
			},
		}});
		break;
	case "joinlogs":
		if(message.channel.TextChannel.topic === "joinlogs-miku" => {
			message.reply('Alrighty! Logs will be sent right here for your reading purposes.');
			joinloggging = true;
		} else {
			message.reply('You\'ll need to set the topic to this channel to: ***_`` logs-miku ```_*** for this to work.');
		}
		break;
	case "version":
		let version = args[0];
		if(version === "v1") {
			message.reply({embed: {
				color: 3447003,
				title: "Version 1",
				url: "https://github.com/Incrested/Miku-Chan/releases/tag/1.0",
				description: "Download and Host Version 1 with this Source",
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "Powered by GitHub"
				},
			}});
		}
		if(!version === "v1") {
			message.reply({embed: {
				color: 3447003,
				title: `Build ${version}`,
				url: `https://raw.githubusercontent.com/Incrested/Miku-Chan/${version}/bot.js`,
				description: `Download and Host the ${version} build.`,
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "Powered by GitHub"
				},
			}});
		}
		break;
	case "reboot":
		if(message.author.id == config.ownerID) {
			process.exit();
		} else if (message.author.id == config.ownerID1) {
			process.exit();
		} else {
			message.reply('Heh, nice try douche. I only listen to my creators here.');
		}
});
client.login(config.token);
