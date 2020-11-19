import { Listener } from 'discord-akairo';

import Client from '../../NeoClient/NeoClient';


export default class NeoCommandStarted extends Listener {
    client: Client
    public constructor(client: Client) {
        super("commandStarted", {
            emitter: "commandHandler",
            event: "commandStarted",
            category: "commandHandler"
        });
        this.client = client
    }

    exec(message, command) {
        this.client.statcord.postCommand(command.id, message.author.id);
        this.client.statcord.post();
    }
}