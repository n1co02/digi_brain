//Author Erik Priemer

import {startServer} from './server/server';
import log from './utility/log';
import {MessageType} from './types';
import {OK} from './constants';
import {config} from 'dotenv';

config();

const PORT = 4042;

(async function () {
  await startServer(PORT /* add params */);
  log(`auth-service running on port ${PORT} ${OK}`, MessageType.Start);
})();
