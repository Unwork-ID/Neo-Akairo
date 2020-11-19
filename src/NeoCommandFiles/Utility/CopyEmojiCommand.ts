import { Command } from "discord-akairo";
import { Message, MessageEmbed, Util } from "discord.js";

export default class EmojiCommands extends Command {
    public constructor() {
        super("emoji", {
            aliases: ["emoji", "ej"],
            category: "Utility",
            description: {
                content: "To see emoji from any server",
                usage: "emoji < emoji >",
                example: [
                    "emoji < your emoji >",
                    "emoji < your nitro emoji >"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "emo",
                    type: "string",
                    match: "rest"
                }
            ]
        });
    }

    public exec(message: Message, { emo }) {
        const customEmo = Util.parseEmoji(emo);

        const link = `https://cdn.discordapp.com/emojis/${customEmo.id}.${
            customEmo.animated ? "gif" : "png"
        }`;

        const emoname = customEmo.name;

        message.guild.emojis.create(`${link}`, `${emoname}`);
        message.channel.send(`Your emoji \`${emoname}\` Succecfully Added To Thi Server\nLink: ${link}`);
    }
}
