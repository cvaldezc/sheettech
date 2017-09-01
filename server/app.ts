import { config } from './config.server';
import { serve } from './server';

import mongoose = require('mongoose');


const PORT = config.port;
mongoose.Promise = Promise
mongoose.connect(config.db, (err) => {
    if (err) {
        console.log(`Error at connect to DB ${err}`);
        return false;
    }
    console.log('Connect to DB Stablished!');
    serve.listen(PORT, () => {
        console.log(`API RESTFUL is running in port http://localhost:${PORT}`);
    });
});
