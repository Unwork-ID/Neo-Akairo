import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed } from "discord.js";
import { utc } from "moment";

export default class BanCommand extends Command {
    public constructor() {
        super("ban", {
            aliases: ["ban"],
            category: "Moderation",
            description: {
                content: "To ban members on this guild",
                usage: "ban < member >",
                example: [
                    "ban @member",
                    "ban @member 7"
                ]
            },
            channel: "guild",
            ratelimit: 3,
            args: [
                {
                    id: "user",
                    type: "member",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please mention member who want to ban`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please mention member who want to ban`
                    }
                },
                {
                    id: "day",
                    type: (_: Message, str: string): null | number => {
                        if (str && !isNaN(Number(str)) && [0, 1, 2, 3, 4, 5, 7].includes(Number(str))) return Number(str);
                        return null;
                    },
                    default: 0
                },
                {
                    id: "reason",
                    type: "strin",
                    default: "No reason provided..."
                }
            ],
            userPermissions: ["BAN_MEMBERS"],
            clientPermissions: ["BAN_MEMBERS"]
        });
    }

    public async exec(message: Message, { user, day, reason }: {user: GuildMember; day: number; reason: string}) {
        if (!message.member.hasPermission(["BAN_MEMBERS"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);

        if (!user.bannable) return message.channel.send(`Sorry, i can't ban this user`);

        if (!message.member.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send(`Sorry, i don't have permission to ban user, make sure you give me \`BAN_MEMBERS\` permission`);

        await user.send(`You has been banned from **${message.guild.name} for reason: \`${reason}\``);
        await message.guild.members.ban(user, { days: day, reason });

        message.util.send(
            new MessageEmbed()
                .setAuthor(`User Banned by ${message.author.tag}`, message.author.avatarURL())
                .setThumbnail(user.user.avatarURL())
                .setDescription(`
                Name: ${user.user.tag}
                Time: ${utc(Date.now())}
                Reason: ${reason}`)
                .setFooter(`Sayonara~`)
                .setTimestamp()
        );
    }
}
