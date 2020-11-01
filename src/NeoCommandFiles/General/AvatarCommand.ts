import { Command } from "discord-akairo";
import type { Message, GuildMember, ImageSize, AllowedImageFormat } from "discord.js";
import { MessageEmbed } from "discord.js";

export default class AvatarCommand extends Command {
    public constructor() {
        super("avatar", {
            aliases: ["avatar", "av"],
            category: "Core",
            description: {
                content: "Display your discord avatar otr other user.",
                usage: "avatar [ member ]",
                example: [
                    "avatar @example#1111",
                    "avatar @example",
                    "avatar @example size=512",
                    "avatar @example format=png",
                    "avatar @example size=512 format=jpg"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "member",
                    type: "member",
                    match: "rest",
                    default: (msg: Message) => msg.member
                },
                {
                    id: "size",
                    type: (_: Message, str: string): null | number => {
                        if (str && !isNaN(Number(str)) && [16, 32, 65, 128, 256, 512, 1024, 2048, 4096].includes(Number(str))) return Number(str);
                        return null;
                    },
                    match: "option",
                    flag: ["size="],
                    default: 4096
                },
                {
                    id: "format",
                    type: (_: Message, str: string) => {
                        if (str && (String(str) && ["png", "webp", "jpg", "jpeg", "gif"].includes(String(str)))) return String(str);
                    },
                    match: "option",
                    flag: "format="
                }
            ],
            channel: "guild"
        });
    }

    public exec(message: Message, { member, size, format }: { member: GuildMember; size: number; format: string}): Promise<Message> {
        return message.util.send(new MessageEmbed()
            .setTitle(`${member.user.username}'s Avatar`)
            .setURL(member.user.displayAvatarURL({ format: format as AllowedImageFormat, size: size as ImageSize, dynamic: true }))
            .setColor("RANDOM")
            .setImage(member.user.displayAvatarURL({ format: format as AllowedImageFormat, size: size as ImageSize, dynamic: true })));
    }
}
