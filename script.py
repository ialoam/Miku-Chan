import discord
import asyncio

client = discord.Client()

@client.event
async def on_message(message):
  if messsage.content.startswith('!ping'):
    await client.send_message(message.channel, 'Your expecting me to say **Pong!**, aren't you?')
    
client.run('MzY1NjQ5OTE4MTQyMDU0NDEw.DLiH3g.yrJsXqNQMeP7g6kFGN_DFo-zlts')
