import type Client from "../../NeoClient/NeoClient";
import { Util } from "../../NeoUtils/NeoUtils";

import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { stripIndents } from "common-tags";


export default class NowPlayCommand extends Command {
    client: Client;
    public constructor(client: Client) {
        super("nowplay", {
            aliases: ["nowplay", "np"],
            category: "Music",
            description: {
                content: "To see current music play",
                usage: "nowplay",
                example: [
                    "nowplay"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
        this.client = client;
    }

    public exec(message: Message) {
        const player = this.client.music.players.get(message.guild.id);
        if (!player || !player.queue.current) return message.channel.send("No song/s currently playing within this guild.");
        const { title, author, duration, identifier } = player.queue.current;
        const util = new Util()
        const embed = new MessageEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL())
            .setImage(`http://i3.ytimg.com/vi/${identifier}/maxresdefault.jpg`)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${util.formatTime(duration)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
}
