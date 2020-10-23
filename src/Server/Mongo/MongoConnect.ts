import { MongoUrl } from '../../config';

import mongoose from 'mongoose';

export default class MongoDB {

    async Connect(): Promise<void> {
        mongoose.connect(MongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => console.log("[ MONGO ] MongoDB Connected"))
        .catch((err) => console.log(err))
    }
}