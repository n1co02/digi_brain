/*Author Erik Priemer*/

import {getGptServiceUrl, getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {
  GetGptBrainstormDocument,
  GetGptPredictionDocument,
  GetKeywordsDocument,
  SaveGptHistoryDocument,
} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
};

const getGptBrainstorm = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}) => {
    try {
      const keywords = (
        await apiFetch(getRoomServiceUrl(), GetKeywordsDocument, {
          roomId: args.roomId,
        })
      ).getKeywords;

      const result = await apiFetch(getGptServiceUrl(), GetGptBrainstormDocument, {
        keywords,
      });

      if (!result) {
        return null;
      }

      const addHistory = await apiFetch(getRoomServiceUrl(), SaveGptHistoryDocument, {
        userId: userId.userId,
        roomId: args.roomId,
        gptHistory: result.getGptBrainstorm,
      });

      if (!addHistory.saveGptHistory) {
        return null;
      }

      return result.getGptBrainstorm;
    } catch (error) {
      return null;
    }
  },
);

export default getGptBrainstorm;
