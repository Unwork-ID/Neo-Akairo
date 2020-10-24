import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

import { Wallpaper } from '../../NeoUtils/Main/Utils/Wallpaper'

export default class WallpaperList extends Command {
    public constructor() {
        super("wallpaperlist", {
            aliases: ["wallpaperlis", "wplist"],
            category: "Wallpaper",
            description: {
                content: "To show all wallpaper list detail and total of wallpaper",
                usage: "wallpaperlist",
                example: [
                    "wallpaperlist",
                    "wplist"
                ]
            },
            ratelimit: 3
        })
    }

    public async exec(message: Message): Promise<Message> {

        let astolfoapi = new Wallpaper()
        let astolfo = await astolfoapi.Astolfo()

        let embed = new MessageEmbed()
        .setAuthor(`All Wallpaper List Power by Enterprise ID`)
        .setDescription([
            `1. **Astolfo** Total Image \`${astolfo.data.length}\``
        ])
        .setTimestamp()
        .setFooter(`Power By Enterprise ID`, "https://cdn.discordapp.com/icons/738991925721432165/ec631b615dac6142a4644ab9d30602c9.png")
        return message.util.send(embed)
    }
}