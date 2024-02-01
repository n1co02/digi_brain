import {gql} from 'graphql-tag';

export const ROOM_SUBSCRIPTION = gql`
  subscription subscribeToRoom($roomId: String!) {
    subscribeToRoom(roomId: $roomId)
  }
`;
