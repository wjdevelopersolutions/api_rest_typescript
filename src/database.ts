import mongoose, { ConnectionOptions } from 'mongoose';
import colors from 'colors';

import config from './config/config';

const dbOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log(`${colors.green('MongoDB')} connection stablished!`)
});

connection.on('error', error => {
    console.log(`${colors.red(error)}`);
    process.exit(0);
});