/*Author Erik Priemer*/

import {startServer} from './server/server';
import {config} from 'dotenv';
import log from './utility/log';
import {MessageType} from './types';
import {OK} from './constants';

config();

const PORT = 4044;

(async function () {
  await startServer(PORT /* add params */);
  log(`gpt-service running on port ${PORT} ${OK}`, MessageType.Start);
})();
