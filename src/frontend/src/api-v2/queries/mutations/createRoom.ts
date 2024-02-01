//Author: Erik Priemer
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {CreateRoomDocument} from '../../../gql/graphql';

type Params = {
  roomName: string;
  keywords: Array<string>;
};

export default async function createRoom(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), CreateRoomDocument, input);
  return result.createRoom;
}
