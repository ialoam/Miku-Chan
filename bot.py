import discord
import asyncio
import aiohttp
import websockets

client = discord.Client()
server = client.get_server(id)

@client.event
async def on_ready():
	print('Logged in as: ' + client.user.name + '(' + client.user.id + ')')
	print('-------')
	
@client.event
async def wait_until_login():
	await client.change_presence(game=discord.Game(name="Stufz. Do $help"))
	print('Status Set.')
	
@client.event
async def on_message(message):
	if message.content.startswith("$ping"):
		await client.send_message(message.channel, "Your expecting me to say ***Pong!***, aren't you?")
		break
	
@client.event
async def on_message(message):
	if message.content.startswith("$icup"):
		await client.send_message(message.channel, "Ha. ha. Very funny. ***(not)***")
		break
	
@client.event
async def on_message(message):
	if message.content.startswith("$ding"):
		await client.send_message(message.channel, "Dong!")
		break
	
@client.event
async def on_message(message):
	if message.content.startswith("$fetchrole"):
		team_list = ["Humans"]
		entered_team = message.content[6:].lower()
		role = discord.utils.get(message.server.roles, name=entered_team)
		roles = [
			"366256516220583937"
		]
		for r in message.author.roles:
			if r.id in roles:
				await client.send_message(message.channel, "You already have the role.")
				break
			if role is None or role.name not in team_list:
				await client.send_message(message.channel, "Welp! That didn't work, contact a Helper or Dev.")
			else:
				try:
					await client.add_roles(message.author, role)
					await client.send_message(message.channel, "Success! Your now a {0}".format(role.name))
				except discord.Forbidden:
					await client.send_message(message.channel, "Sorry, I need ***MANAGE_ROLES*** to do this.")
				break
		break

client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLkWlw.bANvZcyQXhYWXvxg5pvHBflAuss')