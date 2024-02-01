/*Author Erik Priemer*/

import {PubSub} from 'graphql-subscriptions';
import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {AddSectionDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
  sectionName: string;
};

const addSection = createHandler(
  async (_parents: any, args: Params, userId: {userId: string}, pubsub: PubSub) => {
    try {
      const result = await apiFetch(getRoomServiceUrl(), AddSectionDocument, {
        ...args,
        userId: userId.userId,
      });
      pubsub.publish(args.roomId, {subscribeToRoom: userId.userId});
      return result.addSection;
    } catch (error) {
      return null;
    }
  },
);

export default addSection;
