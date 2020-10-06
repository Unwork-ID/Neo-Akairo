import  Client  from '../Client/NeoClient'
import { HOST, PORT, PASSWORD } from '../ErelaConnector/nodes'
import { SpotifyClientID, SpotifyClientSecret} from '../config';

import { Manager } from 'erela.js'
import { TextChannel } from 'discord.js';
import ErelaSpotify from 'erela.js-spotify';

var clientID: string = SpotifyClientID;
var clientSecret: string = SpotifyClientSecret;

export default class Erela {
    client: Client
    music: Manager;
    constructor(client: Client) {
        this.client = client
    }

    async ErelaConnect(): Promise<void> {
            this.client.music = new Manager({
            nodes: [{
                host: HOST,
                port: PORT,
                password: PASSWORD

            }],
            autoPlay: true,
            plugins: [
                new ErelaSpotify({ 
                    clientID, 
                    clientSecret
                })
            ], 
            send: (id, payload) => {
                const guild = this.client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload)
            }
        });

        this.client.music
        .on('nodeConnect', (node) => console.log('[ ERELA ]', `Erela Connected to ${node.options.host}`))
        .on('nodeError', (node, err) => console.log('[ ERELA ERROR ]', `An Error ${err.message}`))
        .on('trackStart', (player, track) => {
            let channel = this.client.channels.cache.get(player.textChannel) as TextChannel
            channel.send(`Playing **${track.title}**`)
        })
        .on('queueEnd', (player) => {
            let channel = this.client.channels.cache.get(player.textChannel) as TextChannel
            channel.send(`Queue has ended and im leaving, Matane~`)
            player.destroy()
        })
    }
}