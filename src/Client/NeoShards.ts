const config = require('dotenv').config()

import { Logger } from '../NeoUtils/NeoUtils'

import { ShardingManager, Shard } from 'discord.js';
import { join } from 'path'

    var manager = new ShardingManager(join(__dirname, "../../finish/start.js"), {
        token: process.env.token,
        totalShards: 1,
        respawn: true,
        mode: 'worker',
        execArgv: [
            '--experimental-worker',
            '--expose-gc',
            '--max_old_space_size=4096',
            '--trace-warnings',
        ],
    });

manager.on("shardCreate", (shard: Shard) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launch Shard #${shard.id}`);

    shard.on("error", (error: Error) => {
        Logger.error(`Shard ${shard.id} error: ${error}`)
    });
    shard.on('message', (message) => {
        try {
            if (typeof message === 'string') message = JSON.parse(message);
            if (typeof message !== 'object') return;
        } catch {
            return;
        }

        manager.shards.get(message.shard)?.respawn();
    });
});

manager.spawn()
