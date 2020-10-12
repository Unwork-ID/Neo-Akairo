import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class SkipCommand extends Command {
    client: Client
    public constructor(client: Client) {
        super("skip", {
            aliases: ["skip"],
            category: "Music",
            description: {
                content: "To stop current music",
                usage: "skip",
                example: [
                    "skip"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        })
        this.client = client
    }
    
    public exec(message: Message): Promise<Message> {
        var player = this.client.music.players.get(message.guild.id);

        if (!player) return message.reply("This guild currently not playing anything");

        var { channel } = message.member.voice

        if(!channel) return message.channel.send("You're not in voice channel");

        if(channel.id !== player.voiceChannel) return message.channel.send("You're not in the same voice channel!")

        player.stop();
        
        return message.channel.send(`Muisc Skip by: <@${message.author.id}>`);
    }
}