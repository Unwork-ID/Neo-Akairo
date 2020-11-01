import { Command } from "discord-akairo";
import type { Message, GuildMember } from "discord.js";
import { MessageEmbed } from "discord.js";
import { utc } from "moment";

export default class KickCommand extends Command {
    public constructor() {
        super("kick", {
            aliases: ["kick"],
            category: "Moderation",
            description: {
                content: "To kick member on this guild",
                usage: "kick < member > ",
                example: [
                    "kick @member"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            args: [
                {
                    id: "user",
                    type: "member",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please tag some users`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please tag some users`
                    },
                    match: "rest"
                },
                {
                    id: "reason",
                    type: "string",
                    default: "No reason provided...."
                }
            ],
            userPermissions: ["KICK_MEMBERS"],
            clientPermissions: ["KICK_MEMBERS"]
        });
    }

    public async exec(message: Message, { user, reason }: {user: GuildMember; reason: string}) {
        if (!message.member.hasPermission(["KICK_MEMBERS"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);

        if (!user.kickable) return message.channel.send(`Sorry, i can't kick this user`);

        if (!message.member.guild.me.hasPermission(["KICK_MEMBERS"])) return message.channel.send(`Sorry, i don't have permission to kick members, make sure you give me \`KICK_MEMBERS\` permission`);

        user.kick().then(x => {
            x.send(`You has been kicked from **${message.guild.name}** for reason \`${reason}\``);
            message.util.send(
                new MessageEmbed()
                    .setAuthor(`User kicked by ${message.author.tag}`, message.author.avatarURL())
                    .setDescription(`
                Name: ${x.user.tag}
                Time Kicked: ${utc(Date.now())}
                Reason: ${reason}`)
                    .setFooter(`Sayonara~`)
                    .setTimestamp()
            );
        });
    }
}
