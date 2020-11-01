import type Client from "../NeoClient/NeoClient";
import { SpotifyClientID, SpotifyClientSecret, HOST, PORT, PASSWORD } from "../config";

import { Manager } from "erela.js";
import type { TextChannel } from "discord.js";
import ErelaSpotify from "erela.js-spotify";

const clientID: string = SpotifyClientID;
const clientSecret: string = SpotifyClientSecret;

export default class Erela {
    client: Client;
    music: Manager;
    constructor(client: Client) {
        this.client = client;
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
                if (guild) guild.shard.send(payload);
            }
        });
        this.client.music
            .on("nodeConnect", node => console.log("[ ERELA ]", `Erela Connected`))
            .on("nodeError", (node, err) => console.log("[ ERELA ERROR ]", `An Error ${err.message}`))
            .on("nodeDisconnect", player => {
                player.destroy();
            })
            .on("trackStart", (player, track) => {
                const channel = this.client.channels.cache.get(player.textChannel) as TextChannel;
                channel.send(`Playing **${track.title}**`);
            })
            .on("queueEnd", player => {
                const channel = this.client.channels.cache.get(player.textChannel) as TextChannel;
                channel.send(`Queue has ended and im leaving, Matane~`);
                player.destroy();
            });
    }
}
