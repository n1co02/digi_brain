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
  color: string;
  headline: string;
  text: string;
  labels: Array<string>;
};

const editCard = createHandler(
  async ({roomId, sectionId, cardId, userId, headline, text, labels, color}: Params) => {
    try {
      //check if User exists
      const existingUser = await UserModel.findOne({userId});
      if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});

      // Find the room by roomId
      const room: Room | null = await RoomModel.findById(roomId);
      if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

      // Find the section by sectionId within the room
      const sectionIndex = room.sections.findIndex(section => section.id === sectionId);
      if (sectionIndex === -1) throw new ServerError('SECTION_DOES_NOT_EXIST', {info: 404});

      // Find the card by cardId
      const cardIndex = room.sections[sectionIndex].cards.findIndex(card => card.id === cardId);
      if (cardIndex === -1) throw new ServerError('CARD_DOES_NOT_EXIST', {info: 404});

      const card = room.sections[sectionIndex].cards[cardIndex];

      // Check if the userId matches the one stored in the card
      if (card.userId !== userId) throw new ServerError('UNAUTHORIZED', {info: 403});

      // Update the headline and text fields
      card.headline = headline;
      card.text = text;
      card.labels = labels;
      card.color = color;
      // Save the updated card
      await room.save();
      // Return the updated room with the deleted keywords
      return true; //return true bei delee und edit
    } catch (error) {
      if (error instanceof ServerError) {
        return error;
      }

      throw new ServerError('DATABASE_ERROR', {info: 500});
    }
  },
);

export default editCard;
