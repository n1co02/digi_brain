//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import {RoomModel, SectionModel} from '../../../database/mongoDbScheme/roomScheme';
import ServerError from '../../../utility/ServerError';
type Params = {
  roomId: string;
  sectionName: string;
};

const addSection = createHandler(async ({roomId, sectionName: name}: Params) => {
  try {
    const room = await RoomModel.findById(roomId);
    if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

    // Create new section
    const newSection = new SectionModel({
      name,
      cards: [],
    });

    room.sections.push(newSection);

    // Save the updated room
    await room.save();

    // Return the updated room with the added section
    return newSection.id as unknown as string;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default addSection;
