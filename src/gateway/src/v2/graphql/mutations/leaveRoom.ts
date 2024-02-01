/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {LeaveRoomDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
};

const leaveRoom = createHandler(async (_parents: any, args: Params, userId: {userId: string}) => {
  try {
    const result = await apiFetch(getRoomServiceUrl(), LeaveRoomDocument, {
      userId: userId.userId,
      ...args,
    });
    return result.leaveRoom;
  } catch (error) {
    return false;
  }
});

export default leaveRoom;
