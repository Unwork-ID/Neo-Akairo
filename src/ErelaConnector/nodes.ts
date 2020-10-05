const config = require('dotenv').config();

export var node = [
        {
            host: `${process.env.LAVA_IP}`,
            port: process.env.LAVA_PORT,
            password: `${process.env.LAVA_PASS}`
        }
    ]
