import Client from '../../Client/NeoClient';

import { Listener } from 'discord-akairo';


export default class NeoDebugListener extends Listener {
    client: Client
	public constructor(client: Client) {
		super('debug', {
			emitter: 'client',
			event: 'debug',
			category: 'client',
        });
        this.client = client
	}

	public exec(event: any) {
		this.client.logger.debug(`[DEBUG] ${event}`);
	}
}