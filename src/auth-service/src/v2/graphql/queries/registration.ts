//Author Nicolas Ostermann
import createHandler from '../../../utility/createHandler';
import {PrismaClient} from '@prisma/client';
import ServerError from '../../../utility/ServerError';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
type Params = {
  userName: string;
  password: string;
};

const registration = createHandler(async ({userName, password}: Params) => {
  try {
    const user = await prisma.userAuth.create({
      data: {
        userId: undefined,
        userName,
        password,
      },
    });
    // Generate JWT token
    const token = jwt.sign({userId: user.userId}, process.env.SECRET_JWT_KEY);

    return {token, userId: user.userId};
  } catch (error) {
    console.error('Error logging in:', error);
    throw new ServerError('LOGIN_FAILED', {info: 500});
  }
});

export default registration;
