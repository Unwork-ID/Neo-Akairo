import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class QueueCommand extends  Command {
    client: Client
    public constructor(client: Client) {
        super("queue", {
            aliases: ["queue"],
            category: "Music",
            description: {
                content: "To see list all music in current queue",
                usage: "queue",
                example: [
                    "queue"
                ]
            },
            ratelimit: 3e5,
            channel: "guild"
        })
        this.client = client
    }

    public exec(message: Message): Promise<Message> {
        var player = this.client.music.players.get(message.guild.id);
        if(!player) return message.channel.send(`Oi!! Baka!! No Music On Queue!`);
    
        var queue = player.queue;
        var e = new MessageEmbed()
        .setAuthor(`Queue for ${message.guild.name}`);
    
        var x = 10;
        var page = player.queue.length && Number(player.queue[0]) ? Number(player.queue[0]) : 1;
    
        var end = page * x;
        var start = end - x;
    
        var tracks = queue.slice(start, end);
    
        if(queue.current) 
        e.addField("Current", `[${queue.current.title}](${queue.current.uri}) request by: ${queue.current.requester}`);
    
        if(!tracks.length) e.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else e.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) request by: ${queue.current.requester}`).join('\n'));
    
        var maxPages = Math.ceil(queue.length / x);
    
        e.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`)
    
        return message.channel.send(e)
    }
}