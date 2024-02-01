//Author Nicolas Ostermann
import createHandler from '../../../utility/createHandler';
import ServerError from '../../../utility/ServerError';
import type {Room, Section} from '../../../database/mongoDbScheme/roomScheme';
import {CardModel, RoomModel} from '../../../database/mongoDbScheme/roomScheme';
import {UserModel} from '../../../database/mongoDbScheme/userScheme';
type Params = {
  roomId: string;
  sectionId: string;
  userId: string;
  color: string;
  headline: string;
  text: string;
  labels: Array<string>;
};

const addCard = createHandler(
  async ({roomId, sectionId, userId, headline, text, color, labels}: Params) => {
    try {
      // Find the room by roomId
      const room: Room | null = await RoomModel.findById(roomId);
      if (!room) throw new ServerError('ROOM_DOES_NOT_EXIST', {info: 404});

      // Find the section by sectionId within the room
      const sectionIndex = room.sections.findIndex(section => section.id === sectionId);
      if (sectionIndex === -1) throw new ServerError('SECTION_DOES_NOT_EXIST', {info: 404});

      //check if User exists
      const existingUser = await UserModel.findOne({userId});
      if (!existingUser) throw new ServerError('USER_DOES_NOT_EXIST', {info: 404});
      const {userName} = existingUser;
      // Get the section object from the sections array
      const section: Section = room.sections[sectionIndex];
      // Create a new card object
      const newCard = new CardModel({
        userId,
        headline,
        userName,
        text,
        color,
        labels,
      });

      // Add the new card to the section
      section.cards.push(newCard);

      // Save the updated room
      await room.save();
      // Return the updated room with the deleted keywords
      return newCard.id as unknown as string;
    } catch (error) {
      if (error instanceof ServerError) {
        return error;
      }

      throw new ServerError('DATABASE_ERROR', {info: 500});
    }
  },
);

export default addCard;
