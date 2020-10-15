import { Listener } from 'discord-akairo';
import Client from '../../Client/NeoClient'


export default class NeoReady extends Listener {
    client: Client
    public constructor(client: Client) {
        super("ready", {
            emitter: "client",
            event: "ready",
            category: "client"
        });
        this.client = client
    }

    public async exec(): Promise<void> {
        console.log('[ INFO ]', `${this.client.user.tag} Ready to go...`)
        this.client.user.setActivity("My Masta Developing Me!", { type: "WATCHING" });
        this.client.music.init(this.client.user.id);
        this.client.ListenMoeJp.ListenConnnect()
        this.client.ListenMoeKr.ListenConnnect();
    }
}