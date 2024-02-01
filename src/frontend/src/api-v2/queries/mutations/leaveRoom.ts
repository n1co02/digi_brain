//Author: Erik Priemer
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {LeaveRoomDocument} from '../../../gql/graphql';

type Params = {
  roomId: string;
};

export default async function leaveRoom(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), LeaveRoomDocument, input);
  return result;
}
