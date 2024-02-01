//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomId: string;
  userId: string;
};

const leaveRoom = createHandler(async ({roomId, userId}: Params) => {
  try {
    // Check if room exists
    const existingRoom = await RoomModel.findById(roomId);
    if (!existingRoom) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

    // Check if user exists
    const existingUser = await UserModel.exists({userId});
    if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});

    // Check if user is the creator of the room
    const Roomcreator = await RoomModel.findById(roomId);
    if (Roomcreator !== null && Roomcreator.creator === userId) {
      throw new ServerError('CREATOR_CANNOT_LEAVE', {info: 403});
    }

    // Remove user from room
    const room = await RoomModel.findOneAndUpdate(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      {_id: roomId, users: userId},
      {$pull: {users: userId}},
      {new: true},
    );

    // Remove room from user
    const user = await UserModel.findOneAndUpdate(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      {userId, 'rooms.roomId': roomId},
      {$pull: {rooms: {roomId}}},
      {new: true},
    );

    if (!room || !user) throw new ServerError('INVALID_ROOM_OR_USER', {info: 400});

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default leaveRoom;
