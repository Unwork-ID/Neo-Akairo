import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class VolumeCommand extends Command {
    client: Client
    constructor(client: Client) {
        super("volume", {
            aliases: ["volume", "volum"],
            category: "Music",
            description: {
                content: "To set volume the music",
                usage: "volume 0-100",
                example: [
                    "volume 100",
                    "volume 50",
                    "volume 10"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            args: [
                {
                    id: "volume",
                    type: "number",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please provide the number of volume`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please provide the number of volume`
                    }
                }
            ]
        })
        this.client = client
    }

    public exec(message: Message, { volume }): Promise<Message> {
        const player = this.client.music.players.get(message.guild.id);
        if (!player) return message.reply(`This guild currently not playing anything`);

        volume = parseInt(volume);
        if (volume > 100) volume = 100;
        player.setVolume(volume);

        return message.channel.send(`Volume succesfully changed to **${volume}**`);
    }
}