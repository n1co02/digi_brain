//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceUrl} from '../../api';
import apiFetch from '../../apiFetch';
import {EditCardDocument} from '../../../gql/graphql';
import {SubscriptionEventHandler} from '../../../utilities/SubscriptionEventHandler';

type Params = {
  input: {
    cardId: string;
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

export default async function editCard(params: Params) {
  params.eventHandler.makeLocalChange();
  const result = await apiFetch(getGatewayServiceUrl(), EditCardDocument, params.input);
  params.eventHandler.synchronizeLocalChange();
  return result.editCard;
}
