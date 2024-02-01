//Author: Erik Priemer
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {DeleteRoomDocument} from '../../../gql/graphql';

type Params = {
  roomId: string;
};

export default async function deleteRoom(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), DeleteRoomDocument, input);
  return result;
}
