import Client from '../../Client/NeoClient';

import { Command } from 'discord-akairo';
import { Message, MessageEmbed } from 'discord.js';

export default class PlayCommand extends Command {
    client: Client
    public constructor(client: Client) {
        super("play" , {
            aliases: ["play", "p"],
            category: "Music",
            description: {
                content: "Play music from youtube or spotify link",
                usage: "play < title | link | playlist >",
                example: [
                    "play Love Story",
                    "play https://music.youtube.com/watch?v=lp-EO5I60KA",
                    "play https://open.spotify.com/track/0bMbDctzMmTyK2j74j3nF3?si=AjF4w-D6RG-46n6uBhhEOA"
                ]
            },
            ratelimit: 3,
            args: [
                {
                    id: "search",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please provide < link | title | playlist >`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please provide < link | title | playlist >`
                    }
                }
            ],
            channel: "guild"
        })
        this.client = client
    }

    public async exec(message: Message, { search }): Promise<Message> {
            var { channel } = message.member.voice
            if(!channel) return message.channel.send("You need to join VoiceChannel first to play music");

            var player = this.client.music.create({
                guild: message.guild.id,
                voiceChannel: channel.id,
                textChannel: message.channel.id,
                selfDeafen: true
            });

            player.connect();

            var res;
            try{
                res = await player.search(search, message.author);
                if(res.loadType === "LOAD_FAILED") {
                    if(!player.queue.current) player.destroy();
                    throw new Error(res.exeption.message);
                }
            } catch (err) {
                return message.channel.send(`There was an error while searching: ${err.message}`)
            }

            switch(res.loadType) {
                case 'NO_MATCHES':
                    if (!player.queue.current) player.destroy();
                    return message.reply('there were no results found.');
                case 'TRACK_LOADED':
                    player.queue.add(res.tracks[0]);
            
                    if (!player.playing && !player.paused && !player.queue.length) player.play();
                    return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
                case 'PLAYLIST_LOADED':
                    player.queue.add(res.tracks);
            
                    if (!player.playing && !player.paused && player.queue.size === res.tracks.length) player.play();
                    return message.reply(`enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
                case 'SEARCH_RESULT':
                    var max = 5, collected, filter = (m) => m.author.id === message.author.id && /^(\d+|end)$/i.test(m.content);
                    if (res.tracks.length < max) max = res.tracks.length;
            
                    var results = res.tracks
                        .slice(0, max)
                        .map((track, index) => `${++index} - \`${track.title}\``)
                        .join('\n');
        
                        var e = new MessageEmbed()
                        .setAuthor(`🎶 Result of ${search} 🎶`, "https://cdn.discordapp.com/attachments/713193780932771891/759022257669406800/yt.png")
                        .setDescription(results)
                        .setFooter(`Request By: ${message.author.tag}`, message.author.avatarURL())
                    message.channel.send(e);
                    try {
                        collected = await message.channel.awaitMessages(filter, { max: 1, time: 30e3, errors: ['time'] });
                        } catch (e) {
                        if (!player.queue.current) player.destroy();
                        return message.reply("you didn't provide a selection.");
                        }
                        var first = collected.first().content;
    
                        if (first.toLowerCase() === 'end') {
                        if (!player.queue.current) player.destroy();
                        return message.channel.send('Cancelled selection.');
                        }
                
                        var index = Number(first) - 1;
                        if (index < 0 || index > max - 1) return message.reply(`the number you provided too small or too big (1-${max}).`);
                
                        var track = res.tracks[index];
                        player.queue.add(track);
                
                        if (!player.playing && !player.paused && !player.queue.length) player.play();
                        return message.reply(`enqueuing \`${track.title}\`.`);
            }
        return;
    }
}