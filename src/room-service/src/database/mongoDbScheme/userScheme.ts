//Author Nicolas Ostermann

import type {Document} from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>(
  {
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    rooms: [{roomId: {type: String, required: true}}],
  },
  {versionKey: false},
);

export type User = {
  userId: string;
  userName: string;
  rooms: Array<{roomId: string}>;
} & Document;

export const UserModel = mongoose.model<User>('User', UserSchema);
