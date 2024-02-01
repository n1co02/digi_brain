//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import type {Room} from '../../../database/mongoDbScheme/roomScheme';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
type Params = {
  roomId: string;
};

const getKeywords = createHandler(async ({roomId}: Params) => {
  try {
    //const room = await RoomModel.find({ id: roomId} ).exec();
    const room: Room | null = await RoomModel.findById(roomId);
    //if (room.length === 0) throw new ServerError('ROOM_DOES_NOT_EXIST', { info: 404 });
    if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});
    const {keywords} = room;

    return keywords;
  } catch (error) {
    console.error(error);
    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default getKeywords;
