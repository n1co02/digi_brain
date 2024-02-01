//Author: Erik Priemer
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {JoinRoomDocument} from '../../../gql/graphql';

type Params = {
  roomId: string;
};

export default async function joinRoom(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), JoinRoomDocument, input);
  return result.joinRoom;
}
