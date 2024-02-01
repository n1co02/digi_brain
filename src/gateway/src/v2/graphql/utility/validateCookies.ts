/*Author Erik Priemer*/

import jwt from 'jsonwebtoken';
import type {DecodedToken} from '../../../types';
import type {NextFunction, Response} from 'express';

export default function validateCookie(
  req: {cookies: {token: string}},
  res: Response,
  next: NextFunction,
): unknown {
  const {cookies} = req;
  if (cookies.token) {
    if (process.env.SECRET_JWT_KEY) {
      try {
        const decoded = jwt.verify(cookies.token, process.env.SECRET_JWT_KEY) as DecodedToken;
        console.log('decoded user id: ', decoded.userId);
        next();
      } catch {
        return res.status(403).send({status: 'Not Authenticated'});
      }
    }
  } else {
    return res.status(403).send({status: 'Not Authenticated'});
  }
}
