//Author Nicolas Ostermann
import createHandler from '../../../utility/createHandler';
import type {Section} from '../../../database/mongoDbScheme/roomScheme';
import {RoomHistoryModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
type Params = {
  roomId: string;
  label: string;
  timestamp: number;
  room: Array<Section>;
};

const createRoomTimestamp = createHandler(async ({roomId, label, timestamp, room}: Params) => {
  try {
    const roomHistoryData = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      roomId,
      room,
      timestamp,
      label,
    };
    const roomHistory = new RoomHistoryModel(roomHistoryData);
    await roomHistory.save();

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default createRoomTimestamp;
