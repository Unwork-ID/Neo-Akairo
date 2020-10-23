const mongoose = require('mongoose');

const AutoRoles = new mongoose.Schema({
    guildID: {
        type: String
    },
    roleID: {
        type: String
    }
})

 module.exports = mongoose.model("AutoRoles", AutoRoles)