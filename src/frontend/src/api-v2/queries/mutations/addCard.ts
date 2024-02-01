//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {AddCardDocument} from '../../../gql/graphql';
import {SubscriptionEventHandler} from '../../../utilities/SubscriptionEventHandler';

type Params = {
  input: {
    roomId: string;
    userName: string;
    sectionId: string;
    headline: string;
    text: string;
    color: string;
    labels: Array<string>;
  };
  eventHandler: SubscriptionEventHandler;
};

export default async function addCard(params: Params) {
  params.eventHandler.makeLocalChange();
  const result = await apiFetch(getGatewayServiceUrl(), AddCardDocument, params.input);
  params.eventHandler.synchronizeLocalChange();
  return result.addCard;
}
