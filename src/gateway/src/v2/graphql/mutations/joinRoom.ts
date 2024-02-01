/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {JoinRoomDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
};

const joinRoom = createHandler(async (_parents: any, args: Params, userId: {userId: string}) => {
  try {
    const result = await apiFetch(getRoomServiceUrl(), JoinRoomDocument, {
      userId: userId.userId,
      ...args,
    });
    return result.joinRoom;
  } catch (error) {
    return false;
  }
});

export default joinRoom;
