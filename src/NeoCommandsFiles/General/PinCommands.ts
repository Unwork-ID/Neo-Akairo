import { Command } from 'discord-akairo';
import { owners } from '../../config';
import { Message } from 'discord.js'

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "General",
            description: {
                content: "Just use it and you'll know",
                usage: "ping",
                example: [
                    "ping"
                ]
            },
            ratelimit: 3e5,
            ignoreCooldown: owners,
            ignorePermissions: owners,
            channel: "guild"
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send("UwU")
    }
}