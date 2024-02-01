/*Author Erik Priemer*/

import {config} from 'dotenv';
import {startServer} from './server/server';

const PORT = 4041;

config();

(async function () {
  await startServer(PORT);
})();
