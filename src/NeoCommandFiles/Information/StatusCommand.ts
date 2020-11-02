import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed, version } from "discord.js";
import { utc } from "moment";
import ms from "ms";
import os from "os";

import { Util } from "../../NeoUtils/NeoUtils";

export default class StatsCommand extends Command {
    public constructor() {
        super("stats", {
            aliases: ["stats", "st"],
            category: "Core",
            description: {
                content: "The Statistic of bot",
                usage: "stats",
                example: [
                    "stats"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        });
    }

    public exec(message: Message): Promise<Message> {
        const ut = new Util();
        const core = os.cpus()[0];
        const djsversion = require("discord.js").version;
        const akairov = require("discord-akairo").version;

        return message.util.send(
            new MessageEmbed()
                .setAuthor(this.client.user.tag, this.client.user.avatarURL())
                .setThumbnail(this.client.user.displayAvatarURL())
                .setColor(message.guild.me.displayHexColor || "RED")
                .addField("General", [
                    `**● Name:** ${this.client.user.tag} (${this.client.user.id})`,
                    `**● Servers:** ${this.client.guilds.cache.size}`,
                    `**● Users:** ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`,
                    `**● Channels:** ${this.client.guilds.cache.reduce((a, b) => a + b.channels.cache.size, 0)}`,
                    `**● Creation Date:** ${utc(this.client.user.createdTimestamp).format("Do MMMM YYYY HH:mm:ss")}`,
                    `**● Bot Uptime:** ${ms(process.uptime() * 1000, { long: true })}`,
                    `**● Node.js:** ${process.version}`,
                    `**● Akairo:** ${akairov}`,
                    `**● Discord.js:** ${djsversion}`,
                    "\u200b"
                ])
                .addField("System", [
                    `**● Platform** ${process.platform}`,
                    `**● Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                    `**● CPU:**`,
                    `\u3000 Cores: ${os.cpus().length}`,
                    `\u3000 Model: ${core.model}`,
                    `\u3000 Speed: ${core.speed}MHz`,
                    `**● Memory:**`,
                    `\u3000 Total: ${ut.formatBytes(process.memoryUsage().heapTotal)}`,
                    `\u3000 Used: ${ut.formatBytes(process.memoryUsage().heapUsed)}`,
                    "\u200b"
                ])
                .addField("Lavalink Status", [
                    `**● CPU**`,
                    `\u3000 Cores: ${this.client.music.nodes.first().stats.cpu.cores}`,
                    `\u3000 System Load: ${this.client.music.nodes.first().stats.cpu.systemLoad.toFixed(2)}%`,
                    `\u3000 Lavalink Load: ${this.client.music.nodes.first().stats.cpu.lavalinkLoad.toFixed(2)}%`,
                    `**● Memory**`,
                    `\u3000 Allocated: ${ut.formatBytes(this.client.music.nodes.first().stats.memory.allocated)}`,
                    `\u3000 Used: ${ut.formatBytes(this.client.music.nodes.first().stats.memory.used)}`,
                    `\u3000 Free: ${ut.formatBytes(this.client.music.nodes.first().stats.memory.free)}`,
                    `**● Uptime: ** ${ms(this.client.music.nodes.first().stats.uptime)}`
                ])
            // Don't delete this embed
                .addField("\u200B", `| **[Website](https://tokisaki.xyz) | [GitHub](https://github.com/Enterprise-ID/Neo-Akairo) | [Discord](https://tokisaki.xyz/discord) | [Statcord](https://statcord.com/bot/${this.client.user.id}) |**`)
                .setFooter(`Request for ${message.author.tag}`, message.author.avatarURL())
                .setTimestamp()
        );
    }
}
