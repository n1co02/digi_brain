//Author: Erik Priemer
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomHistoryDocument} from '../../../gql/graphql';
import {getGatewayServiceUrl} from '../../../api-v2/api';

type Params = {
  roomId: string;
  search: string | undefined;
};

export default async function getRoomHistory(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), GetRoomHistoryDocument, input);
  return result.getRoomHistory;
}
