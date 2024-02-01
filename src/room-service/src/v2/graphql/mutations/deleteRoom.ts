//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomId: string;
  userId: string;
};

const deleteRoom = createHandler(async ({roomId, userId}: Params) => {
  try {
    // Delete room
    const roomCreator = await RoomModel.findById(roomId);
    if (roomCreator !== null && roomCreator.creator !== userId) {
      throw new ServerError('ONLY_CREATOR_CAN_DELETE', {info: 403});
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    await RoomModel.deleteOne({_id: roomId});

    // Remove room from rooms array of all users in the room
    // eslint-disable-next-line @typescript-eslint/naming-convention
    await UserModel.updateMany({'rooms.roomId': roomId}, {$pull: {rooms: {roomId}}});
    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default deleteRoom;
