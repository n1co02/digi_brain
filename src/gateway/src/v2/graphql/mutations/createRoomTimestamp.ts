/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {CreateRoomTimestampDocument, Section} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  label: string;
  timestamp: number;
  room: Section[];
};

const createRoomTimestamp = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), CreateRoomTimestampDocument, {
        ...args,
      });
      return result.createRoomTimestamp;
    } catch (error) {
      return false;
    }
  },
);

export default createRoomTimestamp;
