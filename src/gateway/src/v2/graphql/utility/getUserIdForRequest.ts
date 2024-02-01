/*Author Erik Priemer*/

import jwt from 'jsonwebtoken';
import type {DecodedToken} from '../../../types';

export default function getUserIdForRequest(req: any): string | undefined {
  const {cookies} = req;
  if (process.env.SECRET_JWT_KEY) {
    const decoded = jwt.verify(cookies.token, process.env.SECRET_JWT_KEY) as DecodedToken;
    console.log('getUser: ', decoded.userId);
    return decoded.userId.toString();
  }
}
