import discord
import asyncio
import aiohttp
import websockets
import PyNaCl

client = discord.Client()
server = discord.Server(id='360089583758737408')

@client.event
async def on_ready():
	print('Logged in as: ');
	print(client.user.name);
	print(client.user.id);
	print('-------');
	await client.change_status(game='Stufz. Do $help', idle=False)

@client.event
async def on_message(message):
  if messsage.content.startswith('$ping'):
    await client.send_message(message.channel, 'Your expecting me to say pong');
    
@client.event
async def on_message(message):
  if message.content.startswith('$help'):
    await client.send_messsage(message.channel, 'Add a ! to ping or ding for the beautiful commands');
                              
@client.event
async def on_message(message):
  if message.content.startswith('$ding'):
    await client.send_message(message.channel, 'Dong!');
      
@client.event
async def on_message(message):
  if message.content.startswith('$banned'):
	bans = await client.get_bans(server)
	await client.send_message(message.channel, 'Banned People: ' + server)
	
client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLkWlw.bANvZcyQXhYWXvxg5pvHBflAuss')
