//Author Nicolas Ostermann
import createHandler from '../../../utility/createHandler';
import {GptBrainstormModel} from '../../../database/mongoDbScheme/gptBrainstorm';
import ServerError from '../../../utility/ServerError';
type Params = {
  roomId: string;
  userId: string;
  gptHistory: string;
};

const saveGptHistory = createHandler(async ({roomId, userId, gptHistory}: Params) => {
  try {
    const gptHistoryData = {
      roomId,
      userId,
      answer: gptHistory,
    };

    const gptHistoryModel = new GptBrainstormModel(gptHistoryData);
    await gptHistoryModel.save();

    return true;
  } catch (error) {
    if (error instanceof ServerError) {
      return error;
    }
    console.log(error);
    return new ServerError('DATABASE_ERROR', {info: 500});
  }
});

export default saveGptHistory;
