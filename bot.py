import discord
import asyncio

client = discord.Client()

@client.event
async def on_message(message):
  if messsage.content.startswith('!ping'):
    await client.send_message(message.channel, 'Your expecting me to say pong')
    
@client.event
async def on_message(message):
  if message.content.startswith('!help'):
    await client.send_messsage(message.channel, 'Add a ! to ping or ding for the beautiful commands')
                              
@client.event
async def on_message(message):
  if message.content.startswith('!ding'):
    await client.send_message(message.channel, 'Dong!')
      
client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLkWlw.bANvZcyQXhYWXvxg5pvHBflAuss')
