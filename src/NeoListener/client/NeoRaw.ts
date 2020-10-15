import { Listener } from 'discord-akairo';

import Client from '../../Client/NeoClient';

export default class NeoRaw extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("raw", {
            emitter: "client",
            event: "raw",
            category: "client"
        });
        this.client = client
    }

    public exec(d): Promise<void> {
        this.client.music.updateVoiceState(d)
        return;
    }
}