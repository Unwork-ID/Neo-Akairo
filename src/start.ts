import Neo from './Client/NeoClient';

const client: Neo = new Neo;
client
    .on("error", (err) => client.logger.error(`[ CLIENT ERROR ] ${err.message}`, err.stack))
    .on("shardError", (err, id) => client.logger.error(`[ SHARD ${id} ERROR ] ${err.message}`, err.stack))
    .on("warn", (warn) => client.logger.warn(`[ CLIENT WARN ] ${warn}`))
client.gas();