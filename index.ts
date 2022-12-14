import { config } from 'dotenv';
import { Client, Message, PartialMessage, Partials } from 'discord.js';
import { vedantaPics } from './vedanta';

config();

const client = new Client({
  intents: [
    'MessageContent',
    'DirectMessages',
    'GuildMessages',
    'GuildMembers',
    'Guilds',
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
  ],
});

client.on('ready', () => console.log('Ready!'));

const handleMessage = async (message: Message | PartialMessage) => {
  if (message.author?.id === '942408016517533736') {
    const content =
      (
        await message.channel.messages.fetch(message.id)
      ).content.toUpperCase() || '';
    if (
      content === 'L' ||
      content === 'LL' ||
      content.includes('LLL') ||
      content.includes('L\n') ||
      content.includes(' L ') ||
      (content[0] === 'L' && content[1] === ' ')
    ) {
      message.delete();
      message.channel.send(`What a dog eater <@${message.author?.id}>`);
    }
  }
  if (message.content === '/vedanta') {
    message.delete();
    message.channel.send(
      vedantaPics[Math.floor(Math.random() * vedantaPics.length)],
    );
  }
};

client.on('messageCreate', handleMessage);

client.on('messageUpdate', handleMessage);

client.login(process.env.DISCORD_TOKEN);
