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

        let wallpaper = new Wallpaper();

        let astolfo = await wallpaper.Astolfo();
        let kurumi = await wallpaper.Kurumi();
        let yuno = await wallpaper.YunoGasai();

        let embed = new MessageEmbed()
        .setAuthor(`All Wallpaper List Power by Enterprise ID`)
        .setDescription([
            `1. **Astolfo** Total Image \`${astolfo.data.length}\``,
            `2. **Kurumi** Total Image \`${kurumi.data.length}\``,
            `3. **Yuno Gasai** Total Iamge \`${yuno.data.length}\``
        ])
        .setTimestamp()
        .setFooter(`Power By Enterprise ID`, "https://cdn.discordapp.com/icons/738991925721432165/ec631b615dac6142a4644ab9d30602c9.png")
        return message.util.send(embed)
    }
}