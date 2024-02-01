/*Author Erik Priemer*/

import {loadSchema} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {addResolversToSchema} from '@graphql-tools/schema';
import {projectPath} from '../../projectPath';
import {ApolloServer} from '@apollo/server';
import {PubSub} from 'graphql-subscriptions';
import {WebSocketServer} from 'ws';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import type {Server} from 'http';
import {useServer} from 'graphql-ws/lib/use/ws';
import getRoomList from './queries/getRoomList';
import getRoom from './queries/getRoom';
import getRoomTimestamp from './queries/getRoomTimestamp';
import getGptPrediction from './queries/getGptPrediction';
import leaveRoom from './mutations/leaveRoom';
import joinRoom from './mutations/joinRoom';
import createRoom from './mutations/createRoom';
import deleteRoom from './mutations/deleteRoom';
import addSection from './mutations/addSection';
import addCard from './mutations/addCard';
import editCard from './mutations/editCard';
import deleteCard from './mutations/deleteCard';
import createRoomTimestamp from './mutations/createRoomTimestamp';
import getRoomHistory from './queries/getRoomHistory';
import getGptBrainstorm from './queries/getGptBrainstorm';

export default async function middlewareServer(httpServer: Server): Promise<ApolloServer> {
  const pubsub = new PubSub();

  const graphqlSchema = await loadSchema(projectPath('./gateway/graphql-scheme/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });

  // Subscription params
  type SubscribeToRoomParams = {
    roomId: string;
  };

  const resolvers = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Query: {
      getRoomList: getRoomList(pubsub),
      getRoom: getRoom(pubsub),

      getRoomHistory: getRoomHistory(pubsub),
      getRoomTimestamp: getRoomTimestamp(pubsub),

      getGptPrediction: getGptPrediction(pubsub),
      getGptBrainstorm: getGptBrainstorm(pubsub),
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Mutation: {
      leaveRoom: leaveRoom(pubsub),
      joinRoom: joinRoom(pubsub),
      createRoom: createRoom(pubsub),
      deleteRoom: deleteRoom(pubsub),

      addSection: addSection(pubsub),

      addCard: addCard(pubsub),
      editCard: editCard(pubsub),
      deleteCard: deleteCard(pubsub),

      createRoomTimestamp: createRoomTimestamp(pubsub),
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Subscription: {
      subscribeToRoom: {
        subscribe: (_parent: unknown, args: SubscribeToRoomParams) =>
          pubsub.asyncIterator([args.roomId]),
      },
    },
  };

  const schema = addResolversToSchema({schema: graphqlSchema, resolvers});

  // ws Server (WebSocket)
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql', // localhost:4041/graphql
  });

  const serverCleanup = useServer({schema}, wsServer);

  // Apollo Server
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  return server;
}
