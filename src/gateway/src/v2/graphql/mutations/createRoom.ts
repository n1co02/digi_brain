/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {CreateRoomDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomName: string;
  keywords: Array<string>;
};

const createRoom = createHandler(async (_parents: any, args: Params, userId: {userId: string}) => {
  try {
    const result = await apiFetch(getRoomServiceUrl(), CreateRoomDocument, {
      userId: userId.userId,
      ...args,
    });
    return result.createRoom;
  } catch (error) {
    return null;
  }
});

export default createRoom;
