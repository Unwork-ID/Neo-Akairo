import Client from '../../Client/NeoClient';

import { Listener } from 'discord-akairo';


export default class NeoShardLisneter extends Listener {
    client: Client
    constructor(client: Client) {
        super("shardReady", {
            emitter: "client",
            event: "shardReady",
            category: "client"
        });
        this.client = client
    }

    public exec(id: number) {
        this.client.logger.info(`[ SHARD ${id} READY TO LAUNCH ]`)
    }
}