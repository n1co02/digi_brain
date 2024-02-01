//Author Nicolas Ostermann

import createHandler from '../../../utility/createHandler';
import ServerError from '../../../utility/ServerError';
import type {Room} from '../../../database/mongoDbScheme/roomScheme';
import {RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomId: string;
  sectionId: string;
  cardId: string;
  userId: string;
};

const deleteCard = createHandler(async ({roomId, sectionId, cardId, userId}: Params) => {
  try {
    // Check if User exists
    const existingUser = await UserModel.findOne({userId});
    if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});

    // Check if room exists
    const room: Room | null = await RoomModel.findById(roomId);
    if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

    // Find the index of the section within the room
    const sectionIndex = room.sections.findIndex(section => section.id === sectionId);
    if (sectionIndex === -1) throw new ServerError('SECTION_DOES_NOT_EXIST', {info: 404});

    // Find the index of the card within the section
    const cardIndex = room.sections[sectionIndex].cards.findIndex(card => card.id === cardId);
    if (cardIndex === -1) throw new ServerError('CARD_DOES_NOT_EXIST', {info: 404});

    // Check if the userId matches the one stored in the card
    if (room.sections[sectionIndex].cards[cardIndex].userId !== userId) {
      throw new ServerError('UNAUTHORIZED', {info: 403});
    }

    // Remove the card from the section
    room.sections[sectionIndex].cards.splice(cardIndex, 1);

    // Save the updated room
    await room.save();

    // Return the updated room after deleting the card
    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }

    throw new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default deleteCard;
