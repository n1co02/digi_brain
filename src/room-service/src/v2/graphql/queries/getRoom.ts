//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import type {Room} from '../../../database/mongoDbScheme/roomScheme';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
import {GptBrainstormModel} from '../../../database/mongoDbScheme/gptBrainstorm';
import ServerError from '../../../utility/ServerError';
type Params = {
  roomId: string;
  userId: string;
};

const getRoom = createHandler(async ({roomId, userId}: Params) => {
  try {
    const room: Room | null = await RoomModel.findById(roomId);

    if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const user = await UserModel.findOne({userId, 'rooms.roomId': roomId}, {'rooms.$': 1}).exec();
    if (!user || user.rooms.length === 0) throw new ServerError('UNAUTHORIZED', {info: 403});

    const gptHistoryDatabase = await GptBrainstormModel.find({roomId, userId}).exec();
    const gptHistory: Array<string> = [];
    for (const gpt of gptHistoryDatabase) {
      gptHistory.push(gpt.answer[0]);
    }
    console.log(gptHistory);
    const roomWithGptHistory = {
      id: room.id as string,
      name: room.name as string,
      isCreator: userId === room.creator,
      keywords: room.keywords,
      gptHistory,
      users: room.users,
      sections: room.sections,
    };
    return roomWithGptHistory;
  } catch (error) {
    if (error instanceof ServerError) {
      throw error;
    }
    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default getRoom;
