/*Author Erik Priemer*/

import {getGptServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetGptPredictionDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  prompt: string;
};

const getGptPrediction = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}) => {
    try {
      const result = await apiFetch(getGptServiceUrl(), GetGptPredictionDocument, {
        ...args,
      });
      console.log(result.getGptPrediction);
      return result.getGptPrediction;
    } catch (error) {
      return null;
    }
  },
);

export default getGptPrediction;
