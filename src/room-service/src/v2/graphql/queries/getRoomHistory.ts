//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {RoomHistoryModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';

type Params = {
  roomId: string;
  search: string | null;
};

const getRoomHistory = createHandler(async ({roomId, search}: Params) => {
  try {
    const roomHistoryList = await RoomHistoryModel.find({roomId}).exec();
    // eslint-disable-next-line no-array-constructor
    const roomTimestamps = new Array<{value: number | null; label: string; timestamp: number}>();
    for (const roomHistory of roomHistoryList) {
      let count = 0;
      const {room} = roomHistory;

      for (const section of room) {
        if (section.name && section.name.includes(search || '')) count++;

        for (const card of section.cards) {
          if (card.headline && card.headline.includes(search || '')) count++;
          if (card.text && card.text.includes(search || '')) count++;
          for (const label of card.labels) {
            if (label.includes(search || '')) count++;
          }
        }
        if (!search) count = -1;
      }

      roomTimestamps.push({
        value: count,
        label: roomHistory.label ? roomHistory.label : '',
        timestamp: roomHistory.timestamp ? roomHistory.timestamp : 0,
      });
    }
    return roomTimestamps;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default getRoomHistory;
