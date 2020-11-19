import { Listener } from "discord-akairo";

import type Client from "../../NeoClient/NeoClient";

export default class NeoRaw extends Listener {
    client: Client;
    public constructor(client: Client) {
        super("raw", {
            emitter: "client",
            event: "raw",
            category: "client"
        });
        this.client = client;
    }

    public exec(d) {
        this.client.music.updateVoiceState(d);
    }
}
