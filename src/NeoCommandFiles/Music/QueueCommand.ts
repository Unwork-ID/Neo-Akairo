import type Client from "../../NeoClient/NeoClient";

import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class QueueCommand extends Command {
    client: Client;
    public constructor(client: Client) {
        super("queue", {
            aliases: ["queue", "q"],
            category: "Music",
            description: {
                content: "To see list all music in current queue",
                usage: "queue",
                example: [
                    "queue"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            args: [
                {
                    id: "pagenum",
                    type: (_: Message, str: string): null | number => {
                        if (str && !isNaN(Number(str))) return Number(str);
                        return null;
                    },
                    match: "rest"
                }
            ]
        });
        this.client = client;
    }

    public exec(message: Message, { pagenum }: { pagenum: number}) {
        const player = this.client.music.players.get(message.guild.id);
        if (!player) return message.channel.send(`Oi!! Baka!! No Music On Queue!`);

        const queue = player.queue;
        const e = new MessageEmbed()
            .setAuthor(`Queue for ${message.guild.name}`)
            .setImage(`https://img.youtube.com/vi/${queue.current.identifier}/maxresdefault.jpg`);

        const x = 5;
        const page = player.queue.length && Number(pagenum) ? Number(pagenum) : 1;

        const end = page * x;
        const start = end - x;

        const tracks = queue.slice(start, end);

        if (queue.current) { e.addField("Current", `[${queue.current.title}](${queue.current.uri}) request by: ${queue.current.requester}`); }

        if (!tracks.length) e.setDescription(`No tracks in ${page > 1 ? `page ${page}` : "the queue"}.`);
        else e.setDescription(tracks.map((track, i) => `${start + (++i)} - [${track.title}](${track.uri}) request by: ${queue.current.requester}`).join("\n"));

        const maxPages = Math.ceil(queue.length / x);

        e.setFooter(`Page ${page > maxPages ? maxPages : page} of ${maxPages}`);

        return message.channel.send(e);
    }
}
