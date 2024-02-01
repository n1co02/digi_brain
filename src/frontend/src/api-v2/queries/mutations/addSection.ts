//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceUrl} from '../../api';
import apiFetch from '../../apiFetch';
import {AddSectionDocument} from '../../../gql/graphql';
import {SubscriptionEventHandler} from '../../../utilities/SubscriptionEventHandler';

type Params = {
  input: {
    roomId: string;
    sectionName: string;
  };
  eventHandler: SubscriptionEventHandler;
};

export default async function addSection(params: Params) {
  params.eventHandler.makeLocalChange();
  const result = await apiFetch(getGatewayServiceUrl(), AddSectionDocument, params.input);
  params.eventHandler.synchronizeLocalChange();
  return result.addSection;
}
