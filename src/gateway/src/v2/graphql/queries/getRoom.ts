/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomDocument} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = {
  roomId: string;
};

const getRoom = createHandler(async (_parents: any, args: Params, userId: {userId: string}) => {
  try {
    const result = await apiFetch(getRoomServiceUrl(), GetRoomDocument, {
      ...args,
      userId: userId.userId,
    });
    return result.getRoom;
  } catch (error) {
    return [];
  }
});

export default getRoom;
