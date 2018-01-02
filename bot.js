const Discord = require("discord.js");
const gd = require('node-gd');
const fs = require("fs");
const yt = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Nothing. $cmds');
	console.log('Presence Changed.');
	console.log('-------');
});

client.on('message', message => {
	if(message == "$play") {
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
	if(message == "$join") {
		// Ready for V2
		return new Promise((resolve, reject) => {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel || voiceChannel.type !== 'voice') return msg.sendMessage('I can\'t get there, dude. Help me out?');
			voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
		});
	}
	if(message == "$add") {
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
	if(message == "$queue") {
		// Ready for V2
		if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`The queue\'s empty, you know? Fill her up using ${config.prefix}add`);
		let tosend = [];
		queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ***${song.title}*** - Requested by: ***${song.requester}***`);});
		msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently ***${tosend.length}*** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);
	}
	if(message == "$ping") {
		// Ready for V2
		message.channel.send('Your expecting me to say Pong, right?');
	}
	if(message == "$ding") {
		// Ready for V2
		message.channel.send('Dong!');
	}
	if(message == "$cmds") {
		// Ready for V2
		message.channel.send('Visit the documentation on our site for more info: https://github.com/Incrested/Miku-Chan/wiki/Commands');
	}
	if(message == "$icup") {
		// Ready for V2
		message.channel.send('Ha ha. Very funny. ***(not)***.');
	}
	if(message == "$about") {
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
					value: "You can put the prefix (which is $) in front of $cmds for commands."
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
	if(message == "$google") {
		// Ready for V2
		const args = message.content.slice(config.prefix).trim().split(/ +/g);
		let query = args[0];
		message.channel.send({embed: {
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
	}
	if(message == "$version") {
		// Ready for V2
		let version = args[0];
		if(version === "v1") {
			message.channel.send({embed: {
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
			message.channel.send({embed: {
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
		}
});

client.login(config.token);
