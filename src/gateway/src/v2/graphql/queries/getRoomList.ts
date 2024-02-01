/*Author Erik Priemer*/

import {getRoomServiceUrl} from '../../../api-v2/api';
import apiFetch from '../../../api-v2/apiFetch';
import {GetRoomListDocument, Section} from '../../../gql/graphql';
import createHandler from '../../../utility/createHandler';
type Params = never;

const getRoomList = createHandler(async (_parents: any, args: Params, userId: {userId: string}) => {
  try {
    const result = await apiFetch(getRoomServiceUrl(), GetRoomListDocument, {
      userId: userId.userId,
    });
    return result.getRoomList;
  } catch (error) {
    return [];
  }
});

export default getRoomList;
