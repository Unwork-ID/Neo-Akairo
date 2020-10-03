import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message } from 'discord.js';
import { join } from 'path';
import { Manager } from 'erela.js'


import { prefix, owners, token } from '../config';
import { Constants } from 'discord.js';
import Erela from '../Server/Erela';


declare module 'discord-akairo' {
    interface AkairoClient{
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}


export default class Neo extends AkairoClient {
    music: Manager;
    erela: Erela;
    constructor() {
        super({
            disableMentions: 'everyone',
            partials: Object.values(Constants.PartialTypes)
        })
        this.erela = new Erela(this)
    }

    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "NeoListener")
    });


    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "NeoCommandsFiles"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command.`,
                modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` to cancel the command.`,
                timeout: "You took to loong, the command has now been cancelled.",
                ended: "You exceeded the maximum amout of trie, this command has now been cancelled.",
                cancel: "This command has been cancelled.",
                retries: 3,
                time: 3e4
            },
        },
        ignorePermissions: owners,
        ignoreCooldown: owners,
    });

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async gas(): Promise<string> {
        await this._init();
        await this.erela.ErelaConnect()
        return this.login(token)
    }
}