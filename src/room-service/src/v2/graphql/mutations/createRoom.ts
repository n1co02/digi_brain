//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import type {Section} from '../../../database/mongoDbScheme/roomScheme';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomName: string;
  userId: string; //add Keywords
  keywords: Array<string>;
};

const createRoom = createHandler(async ({roomName, userId: creator, keywords}: Params) => {
  try {
    const existingUser = await UserModel.findOne({userId: creator});
    if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});

    const sections: Array<Section> = [];

    const newRoom = new RoomModel({
      name: roomName,
      creator,
      users: [creator],
      keywords,
      sections,
    });

    existingUser.rooms.push({roomId: newRoom.id as unknown as string});
    await existingUser.save();
    await newRoom.save();
    return newRoom.id as string;
  } catch (error) {
    console.log(error);
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default createRoom;
