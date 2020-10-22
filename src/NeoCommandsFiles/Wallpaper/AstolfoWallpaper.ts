import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';
import { utc } from 'moment';
import request from 'request';

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

        request.get({
            url: "https://tokisaki.xyz/api/astolfo",
            json: true
        }, function(error, response, body) {
            let img = Math.floor(Math.random() * body.length)
            let e = new MessageEmbed()
            .addField("Uploader", `**${body[img].uploader}**`, true)
            .addField("Uploader ID", `\`${body[img].uploaderId}\``, true)
            .addField("Date Upload", utc(body[img].uploadTime).format('Do MMMM YYYY'), true)
            .addField("Upload Time", utc(body[img].uploadTime).format("HH:mm:ss"), true)
            .setFooter("Power by: Enterprise ID API's", "https://cdn.discordapp.com/icons/738991925721432165/ec631b615dac6142a4644ab9d30602c9.png")
            .setImage(body[img].url)
            message.channel.send(e)
        })
        return 
    }
}