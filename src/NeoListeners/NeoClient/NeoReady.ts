import { Listener } from 'discord-akairo';

import NeoClient from '../../NeoClient/NeoClient';

export default class NeoReady extends Listener {
    client: NeoClient
    public constructor(client: NeoClient) {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }

    public exec() {
        console.log(`[ CLIENT READY ] Im ${this.client.user?.tag} Ready To Go`)
        this.client.user?.setActivity(`@${this.client.user?.username} help`);
        this.client.statcord.autopost();

        this.client.statcord
        .on("autopost-start", () => {
            this.client.logger.info(`[ STATCORD ] Autopost Started`)
        })
        .on("post", status => {
            if(!status) this.client.logger.info(`[ STATCORD POST ] Successfuly Posted On Dashbord`)
            else console.log(status)
        })

        this.client.music.init(this.client.user.id)
        this.client.discordbots.discordBoats();
        this.client.discordbots.topgg();
        this.client.discordbots.botsforDiscord();
    }
}