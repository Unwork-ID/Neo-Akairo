import { Message } from 'discord.js';

export default class ListenHandler {
    region: string;
    voiceChannel: string;
    connection: null;
    constructor(message: Message){
        this.voiceChannel = message.member.voice.guild.id;
        this.connection = null;
        this.region = 'JP' ? 'https://listen.moe/stream' : 'https://listen.moe/kpop/stream';
    }
}