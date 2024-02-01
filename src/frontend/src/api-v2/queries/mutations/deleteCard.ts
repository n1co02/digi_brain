//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceUrl} from '../../api';
import apiFetch from '../../apiFetch';
import {AddCardDocument, DeleteCardDocument} from '../../../gql/graphql';
import {SubscriptionEventHandler} from '../../../utilities/SubscriptionEventHandler';

type Params = {
  input: {roomId: string; sectionId: string; cardId: string};
  eventHandler: SubscriptionEventHandler;
};

export default async function deleteCard(params: Params) {
  params.eventHandler.makeLocalChange();
  const result = await apiFetch(getGatewayServiceUrl(), DeleteCardDocument, params.input);
  params.eventHandler.makeLocalChange();
  return result.deleteCard;
}
