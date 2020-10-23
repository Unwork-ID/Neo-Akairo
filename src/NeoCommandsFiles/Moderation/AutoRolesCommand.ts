import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

const AutoRoles = require('../../NeoUtils/Models/Mongo/AutoRoles');

export default class AutoRolesCommand extends Command {
    public constructor(){
        super("autorole", {
            aliases: ["autorole", "atr"],
            category: "Moderation",
            description: {
                content: "To seet autorole on your",
                usage: "autorole < roles name >",
                example: [
                    "autorole member",
                    "autorole users"
                ]
            },
            ratelimit: 2,
            args: [
                {
                    id: "roles",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please type the roles names`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please type the roles names`
                    }
                }
            ]
        })
    }

    public async exec(message: Message, { roles }): Promise<Message> {

        const role = message.guild.roles.cache.find(x => new RegExp(x.name, "i").test(roles) || x.id === `${roles}`)
        console.log(role)
        
        let therole = await AutoRoles.findOne({ guildID: message.guild.id });

        if(!therole) {
            therole = new AutoRoles({
                guildID:  message.guild.id
            });
        }
         therole.roleID = role.id
         await therole.save()

        let embed = new MessageEmbed()
        .setDescription(`Auto Roles on this Server has been seet to **<@&${role.id}>**`)
        message.channel.send(embed)
        
        return
    }
}