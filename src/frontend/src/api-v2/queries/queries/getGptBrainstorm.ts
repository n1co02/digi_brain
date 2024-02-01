//Author: Erik Priemer
import apiFetch from '../../../api-v2/apiFetch';
import {GetGptBrainstormDocument} from '../../../gql/graphql';
import {getGatewayServiceUrl} from '../../../api-v2/api';

type Params = {
  roomId: string;
};

export default async function getGptBrainstorm({roomId}: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), GetGptBrainstormDocument, {
    roomId,
  });
  return result.getGptBrainstorm;
}
