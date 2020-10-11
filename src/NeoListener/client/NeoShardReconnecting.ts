import Client from '../../Client/NeoClient';

import { Listener } from 'discord-akairo';


export default class NeoShardReconnectListener extends Listener {
    client: Client
	public constructor(client: Client) {
		super('shardReconnecting', {
			emitter: 'client',
			event: 'shardReconnecting',
			category: 'client',
        });
        this.client = client
	}

	public exec(id: number) {
		this.client.logger.info(`[SHARD ${id} RECONNECTING]`);
	}
}