import { Command } from "discord-akairo";
import type { Message } from "discord.js";
import { MessageEmbed } from "discord.js";
import { type } from "os";
import req from "snekfetch";

export default class EvalCommand extends Command {
    public constructor() {
        super("eval", {
            aliases: ["eval", "e"],
            category: "Developer",
            description: {
                content: "Some super javascript code",
                usage: "eval < javascript >",
                example: [
                    "eval message.guild.id"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "code",
                    type: "string",
                    match: "rest",
                    default: "Please input some code"
                }
            ],
            ownerOnly: true,
            channel: "guild"
        });
    }

    public async exec(message: Message, { code }) {
        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.tag}'s Evaled`)
            .setColor("RANDOM")
            .addField("Input", `\`\`\`js\n${code}\`\`\``)
            .setFooter(`Request for ${message.author.tag}`, message.author.avatarURL({}));

        try {

            const codes = code;
            if (!codes) return;
            var evaled;
            if (codes.includes(`token`)) {
                evaled = "トークンがありません";
            } else {
                evaled = eval(codes);
            }

            if (typeof evaled !== "string") { evaled = require("util").inspect(evaled, { depth: 0 }); }

            const output = (evaled);
            if (output.length > 1024) {
                const { body } = await req.post("http://tk-bin.glitch.me/documents").send(output);
                embed.addField("Output", `http://tk-bin.glitch.me/${body.key}.js`);
                embed.addField("Type", typeof evaled);
            } else {
                embed.addField("Output", `\`\`\`js\n${output}\`\`\``);
                embed.addField("Type", typeof evaled);
            }
        } catch (e) {
            const error = (e);
            if (error.length > 1024) {
                const { body } = await req.post("http://tk-bin.glitch.me/documents").send(error);
                embed.addField("Error", `http://tk-bin.glitch.me/${body.key}.js`);
                embed.addField("Type", typeof evaled);
            } else {
                embed.addField("Error", `\`\`\`js\n${error}\`\`\``);
                embed.addField("Type", typeof evaled);
            }
        }
        return message.util.send(embed);
    }
}
