import Client from '../../Client/NeoClient'

import { Listener } from 'discord-akairo';


export default class NeoShardDisconnected extends Listener {
    client: Client
    public constructor(client: Client) {
        super("shardDisconnected", {
            emitter: "client",
            event: "shardDisconnected",
            category: "client"
        });
        this.client = client
    }

    public exec(event: any, id: number) {
        this.client.logger.warn(`[ SHARD ${id} DISCONNECTED ] (${event.code})`, event)
    }
}