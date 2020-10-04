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
            ratelimit: 3e5,
            channel: "guild"
        })
        this.client = client
    }
    
    public exec(message: Message): Promise<Message> {
        var player = this.client.music.players.get(message.guild.id);

        if (!player) return message.reply(`This guild currently not playing anything`);

        const is = player.queue.current.requester === message.author.id || message.member.hasPermission(['MANAGE_MESSAGES']);
        if (!is) return message.reply(`Only requester and admin can skip the music`);

        player.stop();
        return message.channel.send(`Muisc Skip by: <@${message.author.id}>`);
    }
}