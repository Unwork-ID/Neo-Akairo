import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { Client } from 'statcord.js';
import { Manager } from 'erela.js';
import { join } from 'path';
import { Logger } from 'winston';

import { logger } from '../NeoUtils/NeoUtils';
import ErelaServer from '../ErelaServer/ErelaClient';
import StatCordServer from '../StatCord/Client';
import DiscordBots from '../DiscordBots/DiscordClient';

declare module 'discord-akairo' {
    interface AkairoClient {
        statcord: Client;
        cord: StatCordServer;
        erela: ErelaServer;
        music: Manager;
        logger: Logger
        discordbots: DiscordBots

    }
}

interface NeoOption {
    owners? : string | string[];
    token?: string;
}

export default class NeoClient extends AkairoClient {

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "NeoCommandFiles"),
        prefix: process.env.PREFIX,
        aliasReplacement: /-g/,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 3000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
                modifyRetry: (_, str): string => `${str}\n\nType \`cancel\` to cancel the commmand`,
                timeout: "You took too long, the command has been cancelled now.",
                ended: "You exceeded the maximum amout of trie, this command has now been cancelled.",
                cancel: "This command has been cancelled now.",
                retries: 3,
                time: 30000,
            },
            otherwise: "",
        },
    });

    public listenerHandler: ListenerHandler = new ListenerHandler(this, { directory: join(__dirname, "..", "Neolisteners")});

    public config: NeoOption;


    public constructor(config: NeoOption) {
        super(
            {   ownerID: config.owners },
            {
                disableMentions: "everyone",
            },
        );
        this.erela = new ErelaServer(this);
        this.cord = new StatCordServer(this);
        this.discordbots = new DiscordBots(this);
        this.config = config;
        this.logger = logger;
    }

    public _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        });

        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();


    }

    public async goo() {
        await this._init();
        await this.cord.cord();
        await this.erela.ErelaConnect();
        return this.login(this.config.token);
    }
}