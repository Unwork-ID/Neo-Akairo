import { Command } from "discord-akairo";
import type { Message, GuildMember } from "discord.js";
import { MessageEmbed } from "discord.js";
import { utc } from "moment";

export default class UnbanCommand extends Command {
    public constructor() {
        super("unban", {
            aliases: ["unban"],
            category: "Moderation",
            description: {
                content: "Unban member on this guild",
                usage: "unban < member id >",
                example: [
                    "unban 242969117479403520"
                ]
            },
            ratelimit: 3,
            channel: "guild",
            args: [
                {
                    id: "user",
                    type: "number",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please provide the user id!`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please provide the user id!`
                    }
                }
            ],
            userPermissions: ["MANAGE_GUILD"],
            clientPermissions: ["MANAGE_GUILD"]
        });
    }

    public async exec(message: Message, { user }: { user: GuildMember }) {
        if (!message.member.hasPermission(["MANAGE_GUILD"])) return message.channel.send(`Sorry, you don't have permission to run this command.`);

        if (!message.member.guild.me.hasPermission(["MANAGE_GUILD"])) return message.channel.send(`Sorry, i don't have permission to unban this user, make sure i have \`MANAGE_GUILD\` permission`);

        await message.guild.members.unban(user).then(x => {
            x.send(`You has been unbanned from **${message.guild.name}**`);

            message.util.send(
                new MessageEmbed()
                    .setAuthor(`Unban member by ${message.author.tag}`, message.author.avatarURL())
                    .setThumbnail(user.user.avatarURL())
                    .setDescription(`
                Name: ${user.user.tag}
                Time: ${utc(Date.now())}`)
                    .setFooter(`Okaerinasai~`)
                    .setTimestamp()
            );
        });
    }
}
