/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {DeleteRoomDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
};

const deleteRoom = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}, pubsub: PubSub) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), DeleteRoomDocument, {
        ...args,
        userId: userId.userId,
      });
      pubsub.publish(args.roomId, {subscribeToRoom: userId.userId});
      return result.deleteRoom;
    } catch (error) {
      return false;
    }
  },
);

export default deleteRoom;
