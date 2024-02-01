//Author Nicolas Ostermann

import type {Document, ObjectId} from 'mongoose';
import mongoose from 'mongoose';

export type Room = {
  id: ObjectId;
  name: string;
  creator: string;
  users: Array<string>;
  keywords: Array<string>;
  sections: Array<Section>;
} & Document;
export type Section = {
  id: ObjectId;
  name: string;
  cards: Array<Card>;
} & Document;
export type Card = {
  id: ObjectId;
  userId: string;
  userName: string;
  headline: string;
  color: string;
  text: string;
  labels: Array<string>;
} & Document;
const CardSchema = new mongoose.Schema<Card>({
  userId: {type: String, required: true},
  userName: {type: String, required: true},
  headline: {type: String, required: true},
  color: {type: String, required: true},
  text: {type: String, required: true},
  labels: [String],
});
const SectionSchema = new mongoose.Schema<Section>({
  name: {type: String, required: true},
  cards: [CardSchema],
});
const RoomSchema = new mongoose.Schema<Room>(
  {
    name: {type: String, required: true},
    creator: {type: String, required: true},
    users: [{type: String}],
    keywords: [{type: String}],
    sections: [SectionSchema],
  },
  {versionKey: false},
);
const RoomHistorySchema = new mongoose.Schema({
  roomId: String,
  room: [SectionSchema],
  timestamp: Number,
  label: String,
});
//add gpt brainstorm userId, roomId, text
export const RoomModel = mongoose.model<Room>('Room', RoomSchema);
export const SectionModel = mongoose.model<Section>('Section', SectionSchema);
export const CardModel = mongoose.model<Card>('Card', CardSchema);
export const RoomHistoryModel = mongoose.model('RoomHistory', RoomHistorySchema);
