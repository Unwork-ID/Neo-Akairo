import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import dur from 'humanize-duration';

export default class NowPlayCommand extends Command {
    client: Client
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
            ratelimit: 3e5,
            channel: "guild"
        })
        this.client = client
    }

    public exec(message: Message): Promise<Message> {
        var player = this.client.music.players.get(message.guild.id);
        if (!player || !player.queue.current) return message.channel.send("No song/s currently playing within this guild.");
        var { title, author, duration, identifier } = player.queue.current;
        console.log(duration)
        var embed = new MessageEmbed()
            .setAuthor("Current Song Playing.", message.author.displayAvatarURL())
            .setImage(`http://i3.ytimg.com/vi/${identifier}/maxresdefault.jpg`)
            .setDescription(stripIndents`
            ${player.playing ? "▶️" : "⏸️"} **${title}** \`${dur(duration)}\` by ${author}
            `);

        return message.channel.send(embed);
    }
}