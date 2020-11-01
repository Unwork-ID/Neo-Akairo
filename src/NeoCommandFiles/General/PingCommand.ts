import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    public constructor() {
        super("ping", {
            aliases: ["ping"],
            category: "General",
            description: {
                content: "Show ping and latency bot",
                usage: "ping",
                example: [
                    "ping"
                ]
            },
            ratelimit: 3
        });
    }

    public exec(message: Message) {
        message.util?.send(`\`${this.client.ws.ping}\`ms`)
    }
}