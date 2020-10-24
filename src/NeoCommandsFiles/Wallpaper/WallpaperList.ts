import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { utc } from 'moment';


import { Wallpaper } from '../../NeoUtils/Main/Utils/Wallpaper'

export default class AstolfoWallpaper extends Command {
    public constructor() {
        super("astolfo", {
            aliases: ["astolfo"],
            category: "Wallpaper",
            description: {
                content: "Give you random astolfo wallpaper from < tokisaki.xyz/api/astolfo >",
                usage: "astolfo",
                example: [
                    "astolfo"
                ]
            },
            ratelimit: 3,
            channel: "guild"
        })
    }


    public async exec(message: Message): Promise<Message> {

            let api = new Wallpaper()

            let res = await api.AstolfoRandom()
            let e = new MessageEmbed()
            .addField("Uploader", `**${res.uploader}**`, true)
            .addField("Uploader ID", `\`${res.uploaderid}\``, true)
            .addField("Date Upload", utc(res.time).format('Do MMMM YYYY'), true)
            .addField("Upload Time", utc(res.time).format("HH:mm:ss"), true)
            .setFooter("Power by: Enterprise ID API's", "https://cdn.discordapp.com/icons/738991925721432165/ec631b615dac6142a4644ab9d30602c9.png")
            .setImage(res.data)
            message.channel.send(e)

        return 
    }
}