/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {AddCardDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  sectionId: string;
  headline: string;
  text: string;
  color: string;
  labels: Array<string>;
  userName: string;
};

const addCard = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}, pubsub: PubSub) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), AddCardDocument, {
        ...args,
        userId: userId.userId,
      });

      pubsub.publish(args.roomId, {subscribeToRoom: userId.userId});

      return result.addCard;
    } catch (error) {
      return null;
    }
  },
);

export default addCard;
