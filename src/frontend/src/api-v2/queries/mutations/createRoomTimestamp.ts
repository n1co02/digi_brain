//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceUrl} from '../../api';
import apiFetch from '../../apiFetch';
import {CreateRoomTimestampDocument} from '../../../gql/graphql';
import {SectionType} from '../../../pages/RoomPage';

type Params = {
  roomId: string;
  label: string;
  timestamp: number;
  room: Array<SectionType>;
};

export default async function createRoomTimeStamp(input: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), CreateRoomTimestampDocument, input);
  return result.createRoomTimestamp;
}
