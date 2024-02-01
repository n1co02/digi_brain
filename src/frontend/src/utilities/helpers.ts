//Author: Nico Mangold
import {RoomType} from '../pages/RoomPage';
import {CardType} from '../components/Card';
import {RoomElement} from '../pages/RoomListPage';

///Provide helper functions to manipulate room

//Removes card and returns shallow copy of room
export function removeCardHelper(room: RoomType, sectionId: string, cardId: string): RoomType {
  room.sections.map((section, sectionIndex) => {
    if (section.id === sectionId) {
      const updatedRoom = room;
      const updatedSectionCards = room.sections[sectionIndex].cards.filter(
        card => card.id !== cardId,
      );
      updatedRoom.sections[sectionIndex].cards = updatedSectionCards;
      return {...updatedRoom};
    }
  });

  return room;
}

//Adds card and returns shallow copy of room
export function addCardHelper(
  room: RoomType,
  sectionId: string,
  card: CardType,
  index?: number,
): RoomType {
  room.sections.map((section, sectionIndex) => {
    if (section.id === sectionId) {
      const updatedRoom = room;
      if (index !== undefined && section.cards[index] !== undefined) {
        //if index is given and existing in array, insert at the given index
        updatedRoom.sections[sectionIndex].cards.splice(index, 0, card);
        return {...updatedRoom};
      } else {
        //if no index given, push at the end of the array
        updatedRoom.sections[sectionIndex].cards.push(card);
        return {...updatedRoom};
      }
    }
  });

  return room;
}

//Updates cardId and returns shallow copy of room
export function updateCardIdHelper(
  room: RoomType,
  sectionId: string,
  oldCardId: string,
  newCardId: string,
): RoomType {
  room.sections.map((section, sectionIndex) => {
    if (section.id === sectionId) {
      section.cards.map((card, cardIndex) => {
        if (card.id === oldCardId) {
          const updatedRoom = room;
          updatedRoom.sections[sectionIndex].cards[cardIndex] = {...card, id: newCardId};
          return {...updatedRoom};
        }
      });
    }
  });

  return room;
}

//Edits card in room with handed over card and returns shallow copy of room
export function editCardHelper(room: RoomType, sectionId: string, card: CardType): RoomType {
  room.sections.map((section, sectionIndex) => {
    if (section.id === sectionId) {
      section.cards.map((cardToEdit, cardIndex) => {
        if (cardToEdit.id === card.id) {
          const updatedRoom = room;
          updatedRoom.sections[sectionIndex].cards[cardIndex] = {...card};
          return {...updatedRoom};
        }
      });
    }
  });

  return room;
}

//Adds section to room and returns shallow copy of the room
export function addSectionHelper(room: RoomType, id: string, name: string): RoomType {
  const updatedRoom = room;
  updatedRoom.sections.push({id: id, name: name, cards: []});
  return {...updatedRoom};
}

//Removes section from room and returns shallow copy of the room
export function removeSectionHelper(room: RoomType, id: string): RoomType {
  return {
    ...room,
    sections: [...room.sections.filter(section => section.id !== id)],
  };
}

//Updates section id of a section and returns shallow copy of the room
export function updateSectionIdHelper(room: RoomType, oldId: string, newId: string): RoomType {
  room.sections.map((section, sectionIndex) => {
    if (section.id === oldId) {
      const updatedRoom = room;
      updatedRoom.sections[sectionIndex].id = newId;
      return {...updatedRoom};
    }
  });
  return room;
}

//Removes roomElement from array and returns array
export function removeRoomHelper(roomList: Array<RoomElement>, roomId: string) {
  const updatedRoomList = roomList.filter(room => room.id !== roomId);
  return updatedRoomList;
}

//Adds roomElement to array and returns shallow copy of array
export function addRoomHelper(roomList: Array<RoomElement>, room: RoomElement, index?: number) {
  const updatedRoomList = roomList;

  if (index !== undefined && roomList[index] !== undefined) {
    updatedRoomList.splice(index, 0, room);
  } else {
    updatedRoomList.push(room);
  }

  return [...updatedRoomList];
}
