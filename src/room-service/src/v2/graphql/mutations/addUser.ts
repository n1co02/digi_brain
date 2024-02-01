//Author Nicolas Ostermann
import createHandler from '../../../utility/createHandler';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
import ServerError from '../../../utility/ServerError';
type Params = {
  userId: string;
  userName: string;
};

const addUser = createHandler(async ({userId, userName}: Params) => {
  try {
    const existingUser = await UserModel.findOne({userId});
    if (existingUser) throw new ServerError('USER_ALREADY_EXISTS', {info: 404});
    await UserModel.create({
      userId,
      userName,
      rooms: [],
    });

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default addUser;
