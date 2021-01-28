require('dotenv').config();
import { Client } from 'statcord.js';

import NeoClient from '../NeoClient/NeoClient';

export default class StatCord {
    neo: NeoClient
    public constructor(neo: NeoClient) { this.neo = neo }

    cord() {
        const client = this.neo
        client.statcord = new Client({
            client,
            key: process.env.STATCORD_KEY,
            postCpuStatistics: true,
            postMemStatistics: true,
            postNetworkStatistics: true
        });
        return;
    }
    return;
}