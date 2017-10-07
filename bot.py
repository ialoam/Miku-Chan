import discord
import asyncio
import aiohttp
import websockets

client = discord.Client()
server = client.get_server(id)

@client.event
async def on_ready():
	print('Logged in as: ');
	print(client.user.name);
	print(client.user.id);
	print('-------');
	await client.change_presence(game=discord.Game(name='Stufz. Do $help'));
	print('Status Set.');

@client.event
async def on_message(message):
	if message.content.startswith("$ping"):
		await client.send_message(message.channel, "Your expecting me to say 'Pong!', aren't you?");
    
@client.event
async def on_message(message):
	if message.content.startswith("$icup"):
		await client.send_message(message.channel, "Ha. ha. Very funny. (not)");
		
@client.event
async def on_message(message):
	if message.content.startswith("$ding"):
		await client.send_message(message.channel, "Dong!");
	
@client.event
async def on_message(message):
	if message.content.startswith("$fetchrole"):
		team_list = ["Humans"]
		entered_team = message.content[6:].lower()
		role = discord.utils.get(message.server.roles, name=entered_team)
		roles = [
			"366256516220583937",
		]
		for r in message.author.roles:
			if r.id in roles:
				await client.send_message(message.channel, "You already have the role.")
			return
			if role is None or role.name not in team_list:
				await client.send_message(message.channel, "Well that's odd. It didn't work, contact a Helper or Dev.")
			else:
				try:
					await client.add_roles(message.author, role)
					await client.send_message(message.channel, "Successfully added role {0}".format(role.name))
				except discord.Forbidden:
					await client.send_message(message.channel, "Sorry, I need ***MANAGE_ROLES*** to do this.")
	
client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLkWlw.bANvZcyQXhYWXvxg5pvHBflAuss')