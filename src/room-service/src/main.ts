//Author Erik Priemer

import {startServer} from './server/server';
import {config} from 'dotenv';
import log from './utility/log';
import {MessageType} from './types';
import {OK} from './constants';
import connectDb from './database/mongoDB';
connectDb();
config();

const PORT = 4043;

(async function () {
  await startServer(PORT /* add params */);
  log(`room-service running on port ${PORT} ${OK}`, MessageType.Start);
})();
