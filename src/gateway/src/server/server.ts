/*Author Erik Priemer*/

import express from 'express';
import {Server, createServer} from 'http';
import {expressMiddleware} from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiFetch from '../api-v2/apiFetch';
import {getAuthServiceUrl, getFrontendUrl, getRoomServiceUrl} from '../api-v2/api';
import {AddUserDocument, LoginDocument, RegistrationDocument} from '../gql/graphql';
import log from '../utility/log';
import {DecodedToken, MessageType} from '../types';
import {OK} from '../constants';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import validateCookie from '../v2/graphql/utility/validateCookies';
import getUserIdForRequest from '../v2/graphql/utility/getUserIdForRequest';
import middlewareServer from '../v2/graphql/middleware';

export async function startServer(PORT: number): Promise<Server> {
  // Server code in here

  const app = express();
  app.use(express.json());
  app.use(cors<cors.CorsRequest>({credentials: true, origin: getFrontendUrl()}));
  app.use(cookieParser());
  const httpServer = createServer(app);

  // start our server
  const server = await middlewareServer(httpServer);
  await server.start();

  // apply middlewares (cors, expressmiddlewares)
  app.post('/login', async (req, res, next) => {
    try {
      const result = await apiFetch(getAuthServiceUrl(), LoginDocument, {
        userName: req.body.userName,
        password: req.body.password,
      });
      res.cookie('token', result.login.token, {httpOnly: true, secure: false, sameSite: 'lax'});
      res.json({userId: result.login.userId});
      next();
    } catch (err) {
      res.status(403).send({userId: null});
    }
  });

  app.post('/registration', async (req, res, next) => {
    try {
      const result = await apiFetch(getAuthServiceUrl(), RegistrationDocument, {
        userName: req.body.userName,
        password: req.body.password,
      });
      const a = await apiFetch(getRoomServiceUrl(), AddUserDocument, {
        userId: result.registration.userId,
        userName: req.body.userName,
      });
      console.log(a.addUser);
      res.cookie('token', result.registration.token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
      });
      res.json({userId: result.registration.userId});
      next();
    } catch (err) {
      res.status(403).send({userId: null});
    }
  });

  app.get('/isauthenticated', async (req, res, next) => {
    const {cookies} = req;
    if (cookies.token) {
      if (process.env.SECRET_JWT_KEY) {
        try {
          const decoded = jwt.verify(cookies.token, process.env.SECRET_JWT_KEY) as DecodedToken;
          res.status(200).send({userId: decoded.userId});
        } catch (err) {
          res.status(403).send({userId: null});
        }
      }
    } else {
      res.status(403).send({userId: null});
    }
  });

  app.use(
    '/graphql',
    bodyParser.json(),
    cookieParser(),
    validateCookie,
    expressMiddleware(server, {
      context: async ({req}) => ({
        userId: getUserIdForRequest(req),
      }),
    }),
  );

  return httpServer.listen(PORT, () => {
    log(`gateway running on port ${PORT} ${OK}`, MessageType.Start);
  });
}
