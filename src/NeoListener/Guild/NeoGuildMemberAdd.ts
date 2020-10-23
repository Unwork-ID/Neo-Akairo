import Client from '../../Client/NeoClient'

import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';

const AutoRoles = require("../../NeoUtils/Models/Mongo/AutoRoles");

export default class NeoMessage extends Listener {
    client: Client
    public constructor(client: Client) {
        super("guildMemberAdd", {
            emitter: "client",
            event: "guildMemberAdd",
            category: "client"
        })
        this.client = client
    }

    public async exec(member: GuildMember): Promise<void> {
        
        let role = await AutoRoles.find()
        for ( const i of role) {
            let guild = this.client.guilds.cache.get(i.guildID)

            let roles = guild.roles.cache.get(i.roleID)
            
            member.roles.add(roles)
        }
        
        return
    }
}