//Author: Erik Priemer
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomDocument} from '../../../gql/graphql';
import {getGatewayServiceUrl} from '../../../api-v2/api';

type Params = {
  roomId: string;
};

export default async function getRoom(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), GetRoomDocument, input);
  return result.getRoom;
}
