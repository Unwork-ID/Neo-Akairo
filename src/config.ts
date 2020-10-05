const config = require('dotenv').config();

export let prefix: string = process.env.PREFIX;
export let owners: string[] = ["242969117479403520"];
export let token: string = process.env.token;
export let SpotifyClientID: string = `${process.env.SpotifyClientID}`
export let SpotifyClientSecret: string = `${process.env.SpotifyClientSecret}`