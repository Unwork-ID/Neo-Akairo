const config = require('dotenv').config();

export let prefix: string = process.env.PREFIX;
export let owners: string[] = ["242969117479403520"];
export let token: string = process.env.token;
export let WebSocketJpop: string = 'wss://listen.moe/gateway_v2';
export let WebSocketKpop: string = 'wss://listen.moe/kpop/gateway_v2';
export let SpotifyClientID: string = `${process.env.SpotifyClientID}`;
export let SpotifyClientSecret: string = `${process.env.SpotifyClientSecret}`;
export let MongoUrl: string = `${process.env.MONGO_URI}`