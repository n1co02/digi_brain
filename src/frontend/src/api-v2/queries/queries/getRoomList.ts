//Author: Erik Priemer
import {getGatewayServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomListDocument} from '../../../gql/graphql';

export default async function getRoomList() {
  const result = await apiFetch(getGatewayServiceUrl(), GetRoomListDocument, {});
  return result.getRoomList;
}
