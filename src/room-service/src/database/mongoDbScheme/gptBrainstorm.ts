//Author Nicolas Ostermann
import type {Document} from 'mongoose';
import mongoose, {Schema} from 'mongoose';

// Definiere ein Interface für das Dokument, das dem Schema entspricht
type IGptBrainstorm = {
  roomId: string;
  userId: string;
  answer: Array<string>;
} & Document;

// Definiere das Schema
const GptBrainstormSchema: Schema = new Schema({
  roomId: {type: String, required: true},
  userId: {type: String, required: true},
  answer: [{type: String}],
});

// Erstelle das Modell
export const GptBrainstormModel = mongoose.model<IGptBrainstorm>(
  'GptBrainstorm',
  GptBrainstormSchema,
);
