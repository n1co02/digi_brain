//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomId: string;
  userId: string;
};

const joinRoom = createHandler(async ({roomId, userId}: Params) => {
  try {
    const existingRoom = await RoomModel.findById(roomId);
    if (!existingRoom) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});
    const existingUser = await UserModel.exists({userId});
    if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});

    // Add user to room
    // Check if the room exists and the user is not already in the users array
    const room = await RoomModel.findOneAndUpdate(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      {_id: roomId, users: {$ne: userId}},
      {$addToSet: {users: userId}},
      {new: true},
    );
    // Check if the user exists and the room is not already in the rooms array
    const user = await UserModel.findOneAndUpdate(
      // eslint-disable-next-line @typescript-eslint/naming-convention
      {userId, 'rooms.roomId': {$ne: roomId}},
      {$addToSet: {rooms: {roomId, answer: ''}}},
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

export default joinRoom;
