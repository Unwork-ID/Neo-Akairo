import Client from '../../Client/NeoClient';

import { Listener } from 'discord-akairo';


export default class NeoShardResumeListener extends Listener {
    client: Client
	public constructor(client: Client) {
		super('shardResumed', {
			emitter: 'client',
			event: 'shardResumed',
			category: 'client',
        });
        this.client = client
	}

	public exec(id: number) {
		this.client.logger.info(`[SHARD ${id} RESUMED]`);
	}
}