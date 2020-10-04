import { Command } from 'discord-akairo';
import { Message, MessageEmbed, version } from 'discord.js';
import { utc } from 'moment';
import ms from 'ms'
import os from 'os'

import { Util } from '../../NeoUtils/NeoUtils';

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
            ratelimit: 3e5,
            channel: "guild"
        })
    }

    public exec(message: Message): Promise<Message> {

        var ut = new Util()
        var core = os.cpus()[0]
        var djsversion = require("discord.js").version;
        var akairov = require("discord-akairo").version;    

        return message.util.send(
            new MessageEmbed()
        .setThumbnail(this.client.user.displayAvatarURL())
        .setColor(message.guild.me.displayHexColor || "RED")
        .addField("General", [
            `**● Name:** ${this.client.user.tag} (${this.client.user.id})`,
            `**● Servers:** ${this.client.guilds.cache.size}`,
            `**● Users:** ${this.client.users.cache.size.toLocaleString()}`,
            `**● Channels:** ${this.client.channels.cache.size.toLocaleString()}`,
            `**● Creation Date:** ${utc(this.client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
            `**● Bot Uptime:** ${ms(process.uptime() * 1000, { long: true})}`,
            `**● Node.js:** ${process.version}`,
            `**● Akairo:** ${akairov}`,
            `**● Discord.js:** ${djsversion}`,
            '\u200b'
        ])
        .addField("System", [
            `**● Platform** ${process.platform}`,
            `**● Uptime:** ${ms(os.uptime() * 1000, { long: true})}`,
            `**● CPU:**`,
            `\u3000 Cores: ${os.cpus().length}`,
            `\u3000 Model: ${core.model}`,
            `\u3000 Speed: ${core.speed}MHz`,
            `**● Memory:**`,
            `\u3000 Total: ${ut.formatBytes(process.memoryUsage().heapTotal)}`,
            `\u3000 Used: ${ut.formatBytes(process.memoryUsage().heapUsed)}`,
        ])
        .setTimestamp());
    }
}