import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class RepeatCommadn extends Command {
    public constructor() {
        super("repeat", {
            aliases: ["repeat", "loop"],
            category: "Music",
            description: {
                content: "To repeat current queue",
                usage: "repeat",
                example: [
                    "repeat"
                ]
            },
            ratelimit: 3
        })
    }

    exec(message: Message) {
        const player = this.client.music.players.get(message.guild.id);
        if (!player || !player.queue.current) return message.channel.send("No song's currently playing within this guild.");

        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "Enable" : "Disable";
        return message.channel.send(`\`${queueRepeat}\` queue repeat`)
    }
}