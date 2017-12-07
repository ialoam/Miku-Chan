const Discord = require("discord.js");
const gd = require('node-gd');
const fs = require("fs");
const yt = require("ytdl-core");
const config = require("./config.json");
const client = new Discord.Client();
const prefix = config.prefix;
const newusers = [];

const regex = /[ABC][123]/g;
let index = 0;
let users = {};
let lastStartedGames = {};
let games = {};
var joinlogging = false;
let queue = {};

if(!fs.existsSync("./archiv")) {
	fs.mkdir("./archiv");
}
setInterval(function () {
	lastStartedGames = {};
}, 30000);

function drawField(gameId, fieldData) {
	var img = gd.createSync(300, 300);
	var color0 = img.colorAllocate(255,255,255);
	var black = img.colorAllocate(0,0,0);
	img.line(100,0,100,300,black);
	img.line(200,0,200,300,black);
	img.line(0,100,300,100,black);
	img.line(0,200,300,200,black);
	Object.keys(fieldData).forEach(function(key) {
		var value = fieldData[key];
		var firstOffset = 0;
		if(key.substr(0,1)=='A') {
			firstOffset = 1;
		} else if(key.substr(0,1) =='B') {
			firstOffset = 2;
		} else {
			firstOffset = 3;
		}
		var secondOffset = arseInt(key.subtr(1,1));
		if(value=="0") {
			img.arc(40+10+((firstOffset *100) - 100), 40+10+((secondOffset * 100) - 100), 80, 80, 0, 360, black);
		} else {
            		img.line(10 + ((firstOffset * 100) - 100), 10 + ((secondOffset * 100) - 100), 90 + ((firstOffset * 100) - 100), 90 + ((secondOffset * 100) - 100), black);
            		img.line(10 + ((firstOffset * 100) - 100), 90 + ((secondOffset * 100) - 100), 90 + ((firstOffset * 100) - 100), 10 + ((secondOffset * 100) - 100), black);
		}
	});
	img.saveJpeg('./' + gameId + '.png');
	img.destroy();
	return './' + gameId + '.png';
}

function checkPlace(index, place) {
	if(place.length != 2) {
		return false;
	}
	var m;
	var m2 = null;
	while((m = regex.exec(place)) !== null) {
		if(m.index === regex.lastIndex) {
			reg.lastIndex++;
		}
		m2 = m;
	}
	if(m2==null) {
		return false;
	}
	return typeof games[index].grid[place] == 'undefined';
}

function hasGameWinner(field) {
    let types = ["O", "X"];
    let intToChar = {1: "A", 2: "B", 3: "C"};
    var i = 1;
    var k = 1;
    var result = "";

    types.forEach(function (type) {
        if (result != "") {
            return;
        }

        for (i = 1; i < 4; i++) {
            if (result != "") {
                break;
            }

            var usedCount = 0;
            for (k = 1; k < 4; k++) {
                var key = intToChar[i].toString() + k.toString();

                if (typeof field[key] == "undefined") {
                    continue;
                }

                if (field[key] == type) {
                    usedCount++;
                }
            }

            if (usedCount == 3) {
                result = type;
                break;
            }
        }

        for (i = 1; i < 4; i++) {
            if (result != "") {
                break;
            }

            usedCount = 0;
            for (k = 1; k < 4; k++) {
                key = intToChar[k].toString() + i.toString();

                if (typeof field[key] == "undefined") {
                    continue;
                }

                if (field[key] == type) {
                    usedCount++;
                }
            }

            if (usedCount == 3) {
                result = type;
                break;
            }
        }

        var extraFields = [
            ["A1", "B2", "C3"],
            ["A3", "B2", "C1"]
        ];

        extraFields.forEach(function (item) {
            var usedCount = 0;
            item.forEach(function (pos) {
                if (typeof field[key] == "undefined") {
                    return;
                }

                if (field[pos] == type) {
                    usedCount++;
                }
            });

            if (usedCount == 3) {
               result = type;
            }
        });
    });

    return result;
}

function sendResult(gameId) {
    var file = drawField(gameId, games[gameId].grid);

    if (Object.keys(games[gameId].grid).length == 9 || hasGameWinner(games[gameId].grid).length > 0) {
        var date = new Date();
        file = "./archiv/" + games[gameId].requestedFrom.username + "-" + games[gameId].rivialUser.username + '-' + date.getTime().toString() + ".jpeg";
        fs.renameSync("./" + gameId + ".png", file);
    }

    games[gameId].requestedFrom.sendFile(file);
    games[gameId].rivialUser.sendFile(file);
}

client.on('ready', () => {
	console.log('Logged in as Miku-Chan!');
	client.user.setGame('Stufz. Do $cmds');
	console.log('Presence Changed.');
	console.log('-------');
});

client.on('guildMemberAdd', (member) => {
	let guild = member.guild;
	let userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
	if(joinlogging = true) {
		if(!newUsers[guild.id]) newUsers.guild.id = new Discord.Collection;
		newUsers[guild.id].set(member.id, member.user);
		if (newUsers[guild.id].size > 10) {
    			guild.channels.get(guild.id).send("Welcome our new users!\n" + userlist);
    			newUsers[guild.id].clear();
  		}
	}
});
	  
client.on('guildMemberRemove', (member) => {
	let guild = member.guild;
	let userlist = newUsers[guild.id].map(u => u.toString()).join(" ");
	if(joinlogging = true) {
		if (newUsers[guild.id].has(member.id)) newUsers.delete(member.id);
	}
});
	
client.on('message', message => {
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	switch(command) {
		case "ttt":
			let playerName = message.content.replace("!ttt ", "");

            if (typeof users[playerName] != 'undefined') {
                message.reply("The player is already in a game");
                return;
            }

            if (playerName == "TicTacToe") {
                message.reply("Meh! you were to easy for me :wink:");
                return;
            }

            if (!client.users.exists('username', playerName)) {
                message.reply("Player could not found");
                return;
            }

            if (playerName == message.author.username) {
                message.reply("Are you stupid? You cant play against you");
                return;
            }

            if (typeof lastStartedGames[userName] != 'undefined') {
                message.reply("You can start every 30 seconds a game");
                return;
            }

            lastStartedGames[userName] = true;


            let nextPlayer = client.users.find("username", playerName);
            sendMessageToUser(nextPlayer, message.author.username + " has invited you to play a TicTacToe. Type ``!ap`` to accept the request");

            message.reply("Request to player was sended. You can end the game with ``!end``");

            games[index] = {
                grid: {},
                requestedFrom: message.author,
                rivialUser: nextPlayer,
                placeUser: nextPlayer,
                started: false
            };
            users[playerName] = index;
            users[message.author.username] = index;

            index++;
		break;
		case "ap":
			if (typeof users[userName] == 'undefined') {
                message.reply("You dont have a game request");
                return;
            }

            let gameId = users[userName];
            let game = games[gameId];

            if (game.requestedFrom.username != userName && !games[gameId].started) {
                games[gameId].started = true;

                sendMessageToUser(games[gameId].requestedFrom, userName + " has accepted our game request. He starts the game");
                message.reply("Game begings Type !pl [A-C][1-3]\n**[A-C]** horizontal\n**[1-3]** vertical.\nExample A1 is top left");
            } else {
                message.reply("The rival must accept you faggot! :wink:");
                return;
            }
		break;
		case "pl":
			let place = message.content.replace("!pl ", "").toUpperCase();

            if (typeof users[userName] == 'undefined') {
                message.reply("You don\'t have a game request");
                return;
            }

            let gameId = users[userName];

            if (games[gameId].placeUser.username != userName) {
                message.reply("The rival plays next");
                return;
            }

            if (checkPlace(gameId, place)) {
                let nextPlayer = (games[gameId].requestedFrom.username == userName ? games[gameId].rivialUser : games[gameId].requestedFrom);
                games[gameId].grid[place] = (games[gameId].requestedFrom.username == userName) ? "O" : "X";
                games[gameId].placeUser = nextPlayer;
                message.reply("The rival plays now");
                sendMessageToUser(nextPlayer, "You can play now.");
                sendResult(gameId);

                if (Object.keys(games[gameId].grid).length == 9) {
                    delete users[games[gameId].requestedFrom.username];
                    delete users[games[gameId].rivialUser.username];
                    delete games[gameId];

                    sendMessageToUser(nextPlayer, "Game finished. All fields are used");
                    message.reply("Game finished. All fields are used");
                } else {
                    var winner = hasGameWinner(games[gameId].grid);

                    if (winner != "") {
                        var winnerName = (winner == "O") ? games[gameId].requestedFrom.username : games[gameId].rivialUser.username;

                        delete users[games[gameId].requestedFrom.username];
                        delete users[games[gameId].rivialUser.username];
                        delete games[gameId];

                        sendMessageToUser(nextPlayer, "Game finished. " + winnerName + " has won");
                        message.reply("Game finished. " + winnerName + " has won");
                    }
                }
            } else {
                message.reply("Wrong input value or the place is used");
            }
		break;
		case "end":
            if (typeof users[userName] == 'undefined') {
                message.reply("You dont have a game request");
                return;
            }

            let gameId = users[userName];

            if (Object.keys(games[gameId].grid).length >= 3) {
                message.reply("You cant end the game, if 3 or more fields are used");
                return;
            }

            sendMessageToUser(games[gameId].requestedFrom, "Game has been closed from " + userName);
            sendMessageToUser(games[gameId].rivialUser, "Game has been closed from " + userName);

            delete users[games[gameId].requestedFrom.username];
            delete users[games[gameId].rivialUser.username];
            delete games[gameId];
		break;
		case "play":
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
			break;
		case "join":
			return new Promise((resolve, reject) => {
				const voiceChannel = msg.member.voiceChannel;
				if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I can\'t get there, dude. Help me out?');
				voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
			});			
			break;
		case "add":
			let url = msg.content.split(' ')[1];
			if (url == '' || url === undefined) return msg.channel.sendMessage(`You need a YouTube URL or ID after ${config.prefix}add`);
			yt.getInfo(url, (err, info) => {
				if(err) return msg.channel.sendMessage('You gave me a broken link, dude. ' + err);
				if (!queue.hasOwnProperty(msg.guild.id)) queue[msg.guild.id] = {}, queue[msg.guild.id].playing = false, queue[msg.guild.id].songs = [];
				queue[msg.guild.id].songs.push({url: url, title: info.title, requester: msg.author.username});
				msg.channel.sendMessage(`Added ***${info.title}*** to the queue`);
			});
			break;
		case "queue":
			if (queue[msg.guild.id] === undefined) return msg.channel.sendMessage(`The queue\'s empty, you know? Fill her up using ${config.prefix}add`);
			let tosend = [];
			queue[msg.guild.id].songs.forEach((song, i) => { tosend.push(`${i+1}. ***${song.title}*** - Requested by: ***${song.requester}***`);});
			msg.channel.sendMessage(`__**${msg.guild.name}'s Music Queue:**__ Currently ***${tosend.length}*** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0,15).join('\n')}\`\`\``);		
			break;
		case "memes":
			message.channel.createWebhook("Miku-Chan", "https://mikuchan.me/web-icon.png")
			.then(webhook => webhook.edit("Miku-Chan", "https://mikuchan.me/web-icon.png")
			.then(wb => message.author.send(`Take the Webhook URL and put it in the IFTTT recipe below: https://canary.discordapp.com/api/webhooks/${wb.id}/${wb.token}`)).catch(console.error))
			.then(message.author.send("https://ifttt.com/applets/64900568d-the-daily-memer-integration-for-miku-chan"));
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
		case "radio":
			if (message.member.voiceChannel) {
				// Add Radio Feature
			} else {
				message.reply('Uh.. That\'s not supposed to happen');
			}
			break;
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
			break;
	}
});
client.login(config.token);
