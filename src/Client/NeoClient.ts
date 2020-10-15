import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Message, Constants, Collection } from 'discord.js';
import { join } from 'path';
import { Manager } from 'erela.js'
import { Logger } from 'winston'

import { prefix, owners, token, WebSocketJpop, WebSocketKpop } from '../config';
import { logger } from '../NeoUtils/NeoUtils';
import ListenHandler from '../NeoUtils/Main/Utils/ListenHandle';

import ErelaServer from '../Server/Erela/ErelaServer';
import ListenMoeServer from '../Server/ListenMoe/ListenMoe';


declare module 'discord-akairo' {
    interface AkairoClient{
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}

interface RadioInfo {
	songName: string;
	artistName?: string;
	artistList?: string;
	artistCount: number;
	sourceName: string;
	albumName: string;
	albumCover: string;
	listeners: number;
	requestedBy: string;
	event: boolean;
	eventName?: string;
	eventCover?: string;
}

interface RadioInfoKpop {
	songName: string;
	artistName?: string;
	artistList?: string;
	artistCount: number;
	sourceName: string;
	albumName: string;
	albumCover: string;
	listeners: number;
	requestedBy: string;
	event: boolean;
	eventName?: string;
	eventCover?: string;
}


interface BotOption {
    owners?: string | string[]
}

export default class Neo extends AkairoClient {
    music: Manager;
    erela: ErelaServer;
    config: BotOption;
    logger: Logger;
    radioInfo!: RadioInfo;
    radioInfoKpop!: RadioInfoKpop;
    ListenMoeJp: ListenMoeServer;
    ListenMoeKr: ListenMoeServer;
    ListenMoe: Collection<string, ListenHandler>
    constructor() {
        super({
            fetchAllMembers: true,
            messageCacheMaxSize: 0,
            disableMentions: 'everyone',
            partials: Object.values(Constants.PartialTypes)
        })
        this.config = this.config
        this.ownerID = owners;
        this.erela = new ErelaServer(this);
        this.logger = logger;
        this.ListenMoeJp = new ListenMoeServer(this, WebSocketJpop, 'jpop');
        this.ListenMoeKr = new ListenMoeServer(this, WebSocketKpop, 'kpop');
        this.ListenMoe = new Collection();
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
        defaultCooldown: 5000,
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
        await this.erela.ErelaConnect();
        return this.login(token)
    }
}