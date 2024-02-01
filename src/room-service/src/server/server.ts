//Author Erik Priemer

import cors from 'cors';
import express from 'express';
import type {Server} from 'http';
import {OK} from '../constants';
import {json} from 'body-parser';
import graphql from '../v2/graphql/middleware';
import startExpressApp from '../utility/startExpressApp';

type Params = Record<string, never>;
type ResBody = string | Record<string, unknown>;
type ReqBody = {
  userId: number;
};

export async function startServer(
  port: number,
  // add params
): Promise<Server> {
  const app = express();
  app.use(cors());

  app.get<Params, ResBody, ReqBody>('/v1/ping', (req, res) => {
    res.send({status: OK});
  });

  app.use('/v2/graphql', json(), await graphql(/*add params */));

  return startExpressApp(app, port);
}
