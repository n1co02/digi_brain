/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomHistoryDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  search: string | undefined;
};

const getRoomHistory = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), GetRoomHistoryDocument, {
        ...args,
      });
      return result.getRoomHistory;
    } catch (error) {
      return [];
    }
  },
);

export default getRoomHistory;
