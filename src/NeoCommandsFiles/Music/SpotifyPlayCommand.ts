import Client from '../../Client/NeoClient';
import { SpotifyClientID, SpotifyClientSecret } from '../../config';

import Spotify from 'node-spotify-api';
import { Message, MessageEmbed } from 'discord.js';
import { Command } from 'discord-akairo';

var spotify = new Spotify({
    id: SpotifyClientID,
    secret: SpotifyClientSecret
})

export default class SpotifyPlayCommand extends Command {
    client: Client
    public constructor(client: Client) {
        super("spotify", {
            aliases: ["spotify", "sp"],
            category: "Music",
            description: {
                content: "To play music from Spotify",
                usage: "spotify < title | link | playlist >",
                example: [
                    "spotify Play Date",
                    "spotify https://open.spotify.com/track/0bMbDctzMmTyK2j74j3nF3?si=AjF4w-D6RG-46n6uBhhEOA"
                ]
            },
            ratelimit: 3e5,
            args: [
                {
                    id: "search",
                    type: "string",
                    match: "rest",
                    prompt: {
                        start: (msg: Message) => `**${msg.author.tag}** Please provide title or link`,
                        retry: (msg: Message) => `**${msg.author.tag}** Please provide title or link`
                    }
                }
            ],
            channel: "guild"
        })
        this.client = client
    }

    public async exec(message: Message, { search }): Promise<Message> {

    spotify.search({ type: 'track', query: `${search}` })
        .then(async (response) => {

        const { channel } = message.member.voice;
        if (!channel) return message.reply('you need to join a voice channel.');


        const player = this.client.music.create({
            guild: message.guild.id,
            voiceChannel: channel.id,
            textChannel: message.channel.id
        });

        player.connect();

        var track = response.tracks.items.slice(0, 5)

        if(response.tracks.items.length < track) track = response.tracks.length;

    let e = new MessageEmbed()
    .setThumbnail('https://cdn.discordapp.com/attachments/713193780932771891/757858588684189746/408668371039682560.png')
    .setAuthor('Spotify Music Searching', 'https://cdn.discordapp.com/emojis/757858938229096468.png?v=1')
    .setColor('RANDOM')
    .setDescription(`${track.map((x, index) => `**${++index}** - [${x.name}](${x.external_urls.spotify})`).join('\n')}`)
    .setFooter(`Request By: ${message.author.tag} | use [ cancel ] if not found your music`, message.author.avatarURL())
    message.channel.send(e);

    const collector = message.channel.createMessageCollector(m => {
    return m.author.id === message.author.id && new RegExp(`^([1-5]|cancel)$`, "i").test(m.content)
    }, {time: 30e3, max: 1});

    collector.on('collect', async (m) => {
    if (/cancel/i.test(m.content)) return collector.stop('cancelled')

    var trc = track[Number(m.content) - 1] 
    var res;
    try {
        res = await player.search(trc.external_urls.spotify, message.author)
        if (res.loadType === 'LOAD_FAILED') {
        if(!player.queue.current) player.destroy();
        throw new Error(res.exception.message);
        }
    } catch (err) {
        console.log(err)
        return message.reply(`there was an error while searching: ${err.message}`);
}
    switch (res.loadType) {
        case 'NO_MATCHES':
        if(!player.queue.current) player.destroy();
        return message.reply('there were no result found.');
        case 'TRACK_LOADED':
            player.queue.add(res.tracks[0])
            if (!player.playing && !player.paused && !player.queue.length) player.play();
            return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
        }

    });

    collector.on("end", (_, reason) => {
    if(["time", "cancelled"].includes(reason)) return message.channel.send("Cancelled selection.")
        });
    }).catch(err => console.log(err));
        return
    }
}