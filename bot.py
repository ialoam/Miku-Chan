import discord
import asyncio

client = discord.Client()

@client.event
async def on_message(message):
  if messsage.content.startswith('!ping'):
    await client.send_message(message.channel, 'Your expecting me to say **Pong!**, right?')
    
@client.event
async def on_message(message):
  if message.content.startswith('!help'):
    await client.send_messsage(message.author, 'The Current Command List is weak and consists only of **!ping**, **!help**, and **!music**. Music is not ready yet')
                              
                              
client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLiH3g.yrJsXqNQMeP7g6kFGN_DFo-zlts')
