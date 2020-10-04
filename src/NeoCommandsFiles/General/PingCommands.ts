import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class Ping extends Command {
    public constructor() {
        super("ping", {
            aliases: ['pong', 'ping'],
            category: "Core",
            description: {
                content: "Check Bot Online Or Not",
                usage: "ping",
                example: [
                    "ping"
                ]
            },
            ratelimit: 3,
            channel: 'guild'
        });
    }

    public exec(message: Message): Promise<Message> {
        return message.util.send(`Pong! \`${this.client.ws.ping}\`ms`)
    }
}