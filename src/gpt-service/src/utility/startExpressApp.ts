/*Author Erik Priemer*/

import type {Express} from 'express';
import type {Server} from 'http';

export default function startExpressApp(app: Express, port: number): Promise<Server> {
  return new Promise(resolve => {
    const server = app.listen(port, () => {
      resolve(server);
    });
  });
}
