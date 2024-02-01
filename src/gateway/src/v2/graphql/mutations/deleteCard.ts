/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {DeleteCardDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  sectionId: string;
  cardId: string;
};

const deleteCard = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}, pubsub: PubSub) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), DeleteCardDocument, {
        ...args,
        userId: userId.userId,
      });
      pubsub.publish(args.roomId, {subscribeToRoom: userId.userId});
      return result.deleteCard;
    } catch (error) {
      return false;
    }
  },
);

export default deleteCard;
