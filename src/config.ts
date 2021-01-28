require('dotenv').config();

/* Bot Config */
export const token: string = process.env.token;
export const owners: string[] = ["242969117479403520"];

/* Lavalink Credential */
export const HOST: string = process.env.LAVA_IP;
export let PORT: number = 6666;
export const PASSWORD: string = process.env.LAVA_PASS;

/* Spotify Credential */
export const SpotifyClientID = `${process.env.SpotifyClientID}`;
export const SpotifyClientSecret = `${process.env.SpotifyClientSecret}`;

/* Discord Boats */
export const DiscordBoatsOn: boolean = true

/* Top.gg */
export const TopggOn: boolean = true

/* Bots For Discord */
export const BotsForDiscord: boolean = true