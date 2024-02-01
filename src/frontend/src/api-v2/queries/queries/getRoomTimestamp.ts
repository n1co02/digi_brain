//Author: Erik Priemer + Nico Mangold
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomTimestampDocument} from '../../../gql/graphql';
import {getGatewayServiceUrl} from '../../../api-v2/api';
import {SubscriptionEventHandler} from '../../../utilities/SubscriptionEventHandler';

type Params = {
  input: {roomId: string; timestamp: number};
  eventHandler: SubscriptionEventHandler;
};

export default async function getRoomTimestamp(params: Params) {
  params.eventHandler.makeLocalChange();
  const result = await apiFetch(getGatewayServiceUrl(), GetRoomTimestampDocument, params.input);
  params.eventHandler.synchronizeLocalChange();
  return result.getRoomTimestamp;
}
