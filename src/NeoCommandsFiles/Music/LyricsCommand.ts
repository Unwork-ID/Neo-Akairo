import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-superfetch';

export default class LyricsCommand extends Command {
    client: Client
    public constructor(client: Client) {
        super("lyrics", {
            aliases: ["lyrics"],
            category: "Music",
            description: {
                content: "Display lyrics in current queue",
                usage: "lyrics",
                example: [
                    "lyrics"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        })
        this.client = client
    }

    public async exec(message: Message): Promise<Message> {
        var player = await this.client.music.players.get(message.guild.id);
    if (!player) return message.channel.send("There is no music playing right now");

    function chunk(array, chunkSize) {
        var temp = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            temp.push(array.slice(i, i + chunkSize));
        };
        return temp;
    };

    try {
        var hasil = await fetch.get(`https://lyrics-api.powercord.dev/lyrics?input=${player.queue.current.title}`);
        var result = JSON.parse(hasil.text);
        if (result.total === 0) return message.channel.send("No lyrics found");

        var chunked = chunk(result.data[0].lyrics, 2040);
        for (var i = 0; i < chunked.length; i++) {
            var emb = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(result.data[0].name)
                .setThumbnail(result.data[0].album_art)
                .setDescription(chunked[i]);
            message.channel.send(emb);
        };
    } catch (err) {
        return message.channel.send("Error: " + err.message);
    };
    return
    }
}