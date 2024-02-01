/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomTimestampDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  timestamp: number;
};

const getRoomTimestamp = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}, pubsub: PubSub) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), GetRoomTimestampDocument, {
        ...args,
      });
      pubsub.publish(args.roomId, {subscribeToRoom: userId.userId});
      return result.getRoomTimestamp;
    } catch (error) {
      return [];
    }
  },
);

export default getRoomTimestamp;
