//Author Nicolas Ostermann

/* eslint-disable @typescript-eslint/naming-convention */
import createHandler from '../../../utility/createHandler';
import {RoomHistoryModel, RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';

type Params = {
  roomId: string;
  timestamp: string;
};

const getRoomTimestamp = createHandler(async ({roomId, timestamp}: Params) => {
  try {
    const roomHistory = await RoomHistoryModel.findOne({
      roomId,
      timestamp,
    });

    if (!roomHistory) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

    const sections = roomHistory.room;

    // Find the room by id and update sections
    await RoomModel.findByIdAndUpdate(roomId, {sections}, {new: true});

    return sections;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default getRoomTimestamp;
