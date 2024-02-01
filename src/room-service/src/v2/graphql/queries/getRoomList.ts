//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
import type {Section} from '../../../database/mongoDbScheme/roomScheme';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
type Params = {
  userId: string;
};

const getRoomList = createHandler(async ({userId}: Params) => {
  try {
    const existingUser = await UserModel.findOne({userId});
    if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});
    const rooms = await RoomModel.find({users: userId}).exec();

    const roomsAdjustment: Array<{
      id: string;
      name: string;
      isCreator: boolean;
      keywords: Array<string>;
      users: Array<string>;
      sections: Array<Section>;
    }> = [];

    for (const room of rooms) {
      roomsAdjustment.push({
        id: room.id as string,
        name: room.name,
        isCreator: userId === room.creator,
        keywords: room.keywords,
        users: room.users,
        sections: room.sections,
      });
    }
    return roomsAdjustment;
  } catch (error) {
    console.log(error);
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default getRoomList;
