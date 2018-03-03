const Discord = require("discord.js");
const gd = require('node-gd');
const fs = require("fs");
const yt = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;
const request = require('request');
const rn = require('random-number');

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Use m!help');
	console.log('Presence Changed.');
	console.log('-------');
});

client.on('message', message => {
	
	function help() {
		// Clamp 2 commands to a line?
		message.channel.send({embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: client.user.avatartURl
			},
			title: "Miku-Chan - Help",
			url: "http://github.com/Miku-Chan-Devs/Miku-Chan/wiki/Commands",
			description: "Miku-Chan's commands are as follows. The prefix is \"m!\".",
			fields: [
			{
				name: "m!8ball",
				value: "It's an 8ball..."
			}
			{
				name: "m!help, m!h, m!cmds",
				value: "See the commands that Miku-Chan understands"
			},
			{
				name: "m!icup",
				value: "I C U P"
			},
			{
				name: "m!about",
				value: "Learn about Miku-Chan"
			},
			{
				name: "m!google",
				value: "Google what's after the command"
			},
			{
				name: "m!pocketmonster",
				value: "Search the Pocket Monster Directory"
			},
			{
				name: "m!tf, m!uf",
				value: "Animate a tableflip and un-flipping a table"
			},
			{
				name: "m!botisdead",
				value: "Get a Link to the Miku-Chan status page"
			},
			{
				name: "m!ping, m!ding",
				value: "Get your ping, or just ding"
			},
			{
				name: "m!join",
				value: "Join the Current Voice Channel"
			},
			{
				name: "m!add",
				value: "Add to the Queue"
			},
			{
				name: "m!queue",
				value: "See the Queue"
			},
			{
				name: "m!play",
				value: "Play a song from YouTube"
			},
			{
				name: "m!purge",
				value: "Delete a certain amount of messages (including the current one)"
			}],
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Use those Commands Now"
			}
	}});
}
	
	if(message == "m!play") {
		// Ready for V2
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`I'm not a magician. Add some songs using ${config.prefix}add`);
		if (!msg.guild.voiceConnection) return commands.join(msg).then(() => commands.play(msg));
		if (queue[msg.guild.id].playing) return msg.channel.sendMessage('Already playing music, idiot.');
		let dispatcher;
		queue[msg.guild.id].playing = true;

		console.log(queue);
		(function play(song) {
			console.log(song);
			if (song === undefined) return msg.channel.sendMessage('The queue\'s empty, you know?').then(() => {
				queue[msg.guild.id].playing = false;
				msg.member.voiceChannel.leave();
			});
			msg.channel.sendMessage(`Playing ***${song.title}*** as requested by ***${song.requester}***`);
			dispatcher = msg.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes : config.passes });
			let collector = msg.channel.createCollector(m => m);
			collector.on('message', m => {
				if (m.content.startsWith(config.prefix + 'pause')) {
					msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
				} else if (m.content.startsWith(config.prefix + 'resume')){
					msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
				} else if (m.content.startsWith(config.prefix + 'skip')){
					msg.channel.sendMessage('skipped').then(() => {dispatcher.end();});
				} else if (m.content.startsWith(config.prefix + 'time')){
					msg.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000)/1000) <10 ? '0'+Math.floor((dispatcher.time % 60000)/1000) : Math.floor((dispatcher.time % 60000)/1000)}`);
				}
			});
			dispatcher.on('end', () => {
				collector.stop();
				play(queue[msg.guild.id].songs.shift());
			});
			dispatcher.on('error', (err) => {
				return msg.channel.sendMessage('We have an error, guys. ' + err).then(() => {
					collector.stop();
					play(queue[msg.guild.id].songs.shift());
				});
			});
		})(queue[msg.guild.id].songs.shift());
	}
	if(message == "m!join") {
		// Ready for V2
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.sendMessage('I can\'t get there, dude. Help me out?');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	}
	if(message == "m!add") {
		// Ready for V2
		let url = msg.content.split(' ')[1];
		if (url == '' || url === undefined) return msg.channel.sendMessage(`You need a YouTube URL or ID after ${config.prefix}add`);
		yt.getInfo(url, (err, info) => {
			if(err) return msg.channel.sendMessage('You gave me a broken link, dude. ' + err);
			if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
			queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
			msg.channel.sendMessage(`Added ***${info.title}*** to the queue`);
		});
	}
	if(message == "m!queue") {
		// Ready for V2
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`The queue\'s empty, you know? Fill her up using ${config.prefix}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ***${song.title}*** - Requested by: ***${song.requester}***`);});
		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently ***${tosend.length}*** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
	if(message == "m!ping") {
		// Ready for V2
		var ping = new Date().getTime() - message.createdTimestamp + " ms";
		message.channel.send("Pong! The last ping was " + client.ping + " ms.");  
	}
	if(message == "m!ding") {
		// Ready for V2
		message.channel.send('Dong!');
	}
	if(message == "m!cmds") {
		// Ready for V2
		help();
	}
	if(message == "m!help") {
		// Ready for V2
		help();
	}
	if(message == "m!h") {
		// Ready for V2
		help();
	}
	if(message == "m!icup") {
		// Ready for V2
		message.channel.send('Ha ha. Very funny. ***(not)***.');
	}
	if(message == "m!about") {
		// Ready for V2
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
					value: "You can put the prefix (which is m!) in front of $cmds for commands."
				},
				{
					name: "Source Code",
					value: "Since Miku-Chan is open-source, you can check the source [here](http://github.com/Incrested/Miku-Chan)."
				},
				{
					name: "Acknowledgments",
					value: "We love to acknowledge the people who worked on this. So, check the source code above and visit the README.md file."
				}],
				timestamp: new Date(),
				footer: {
					icon_url: client.user.avatarURL,
					text: "Miku-Chan"
				}
			}});
		}
	}
	if(message == "m!google") {
		// Broken. Doesn't Crash Bot (to testing knowledge)
		const args = message.content.slice(config.prefix).trim().split(/ +/g);
		let query = args[0];
		message.channel.send({embed: {
			color: 3447003,
			title: "Your Search",
			url: `https://www.google.com/search?hl=en_US&q=` + args.toString().replace(/,/g, '+') + ')',
			description: "Look at your Search Query via Google.",
			timestamp: new Date(),
			footer: {
				icon_url: client.user.avatarURL,
				text: "Powered by Google"
			},
		}});
	}
	if(message == "m!pocketmonster") {
		// Broken. Doesn't Crash Bot (to testing knowledge)
		const args = message.content.slice(config.prefix).trim().split(/ + /g);
		message.channel.send({embed: {
			color: 3447003,
			title: "Your Search",
			url: `https://bulbapedia.bulbagarden.net/w/index.php?title=Special:Search&go=Go&searchToken=75r5fsf9yrqhcfdj8jul3tfwn&search=` + args.toString().replace(/,/g, '+') + ' ',
			description: `Check the Bulbagarden for the ` + args.toString().replace(/,/g, '+') + ` you were looking for`,
			timestamp: new Date(),
		footer: {
			icon_url: client.user.avatarURL,
			text: "Powered by Bulbasaur at the Bulbapedia section on the Bulbagarden"
		},
		}});
	}
	if(message == "m!tf") {
		// Ready for V2
		message.channel.send("(°-°)\\ ┬─┬").then(m => {
			setTimeout(() => {
				m.edit("(╯°□°)╯    ]").then(ms => {
					setTimeout(() => {
						ms.edit("(╯°□°)╯  ︵  ┻━┻")
					}, 500)
				})
			}, 500);
		});
	}
	if(message == "m!uf") {
		// Ready for V2
		message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
			setTimeout(() => {
				m.edit("(╯°□°)╯    ]").then(ms => {
					setTimeout(() => {
						ms.edit("(°-°)\\ ┬─┬")
					}, 500)
				});
			}, 500);
		});
	}
	if(message == "m!botisdead") {
		// Ready for V2
		message.channel.send("If the bot is offline, visit http://status.mikuchan.me to find out when the bot comes back up again.");
	}
	if(message == "m!help") {
		// Ready for V2
		help();
	}
	if(message == "m!8ball") {
		// Ready for V2
		var responses = ["It is certain", "Without a doubt", "You may rely on it", "Most likely", "Yes", "Signs point to yes", "Better not tell you now", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
		message.channel.send(":8ball: " + responses[Math.floor(Math.random() * (responses.length))]);
	}

});
client.login(config.token);