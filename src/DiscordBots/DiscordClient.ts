import axios from 'axios';

import Client from '../NeoClient/NeoClient';
import { DiscordBoatsOn, TopggOn, BotsForDiscord } from '../config';


export default class DiscordBot {
    client: Client
    constructor(client: Client){
        this.client = client
    }



    discordBoats() {
        var guildSize = this.client.guilds.cache.size
        var clientID = this.client.user.id
        function on(value) {
            if (value === false) {
                console.log(`[ Discord Boats ] Turn Off, You can turn this on on config file if your bot on discord.boats`)
            } else {
                setInterval(async () => {
                    await axios({
                        method: "post",
                        url: `https://discord.boats/api/bot/${clientID}`,
                        data: {
                            server_count: guildSize
                        },
                        headers: {
                            'Authorization': process.env.DISCORD_BOATS
                        }
                    })
                }, 1800000)
                console.log(`[ Discord Boats ] Turn On, It'll update server_count every 30 minutes`)
            }
        }
        on(DiscordBoatsOn) // set this to (false) on config file if your not in discord.boats
    }

    async topgg() {
        var guildSize = this.client.guilds.cache.size
        var shardCount = this.client.ws.shards.size
        function on(value) {
            if(value === false) {
                console.log(`[ TOP.GG ] Turn off, You can turn this on in config file if your bot on top.gg`)
            } else {
                const dblapi = require('dblapi.js');
                const dbl = new dblapi(`${process.env.TOP_GG}`,)
                setInterval(() => {
                    dbl.postStats(guildSize, shardCount)
                }, 1800000)
                console.log(`[ TOP.GG ] Turn On, It'll update Turn On, It'll update server_count and shard_count every 30 minutes`)
            }
        }
        on(TopggOn) // set this to (false) on config file if your not in in top.gg
    }

    async botsforDiscord() {
        var guildSize = this.client.guilds.cache.size
        var clientID = this.client.user.id
        function on(value) {
            if(value === false) {
                console.log(`[Bots For Discord] Turn Off, you can turn this on in config file if your bot on botsfordiscord.com`)
            } else {
                setInterval(async () => {
                    await axios({
                        method: "post",
                        url: `https://botsfordiscord.com/api/bot/${clientID}`,
                        data: {
                            server_count:  guildSize
                        },
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": process.env.BOTS_FOR_DISCORD
                        }
                    })
                }, 1800000)
                console.log(`[ Bots For Discord ] Turn On, It'll update server_count every 30 minutes`)
            }
        }
        on(DiscordBoatsOn) // set this to (false) on config file if your not in botsfordiscord.com
    }
}