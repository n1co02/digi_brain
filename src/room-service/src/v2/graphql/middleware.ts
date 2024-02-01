//Author Erik Priemer
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {graphqlHTTP} from 'express-graphql';
import {projectPath} from '../../projectPath';
import {loadSchema} from '@graphql-tools/load';
import {parse} from 'graphql';
import OpenAiError from '../../utility/ServerError';
import getRoom from './queries/getRoom';
import addCard from './mutations/addCard';
import addSection from './mutations/addSection';
import addUser from './mutations/addUser';
import createRoom from './mutations/createRoom';
import deleteCard from './mutations/deleteCard';
import deleteRoom from './mutations/deleteRoom';
import editCard from './mutations/editCard';
import joinRoom from './mutations/joinRoom';
import leaveRoom from './mutations/leaveRoom';
import getRoomList from './queries/getRoomList';
import createRoomTimestamp from './mutations/createRoomTimestamp';
import getRoomHistory from './queries/getRoomHistory';
import getRoomTimestamp from './queries/getRoomTimestamp';
import getKeywords from './queries/getKeywords';
import saveGptHistory from './mutations/saveGptHistory';

export default async function graphql(): Promise<ReturnType<typeof graphqlHTTP>> {
  //add params
  const schema = await loadSchema(projectPath('graphql-scheme/scheme.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const queries = {
    getRoomList: getRoomList(),
    getRoom: getRoom(),

    getRoomHistory: getRoomHistory(),
    getRoomTimestamp: getRoomTimestamp(),

    getKeywords: getKeywords(),
  };

  const mutations = {
    leaveRoom: leaveRoom(),
    joinRoom: joinRoom(),
    createRoom: createRoom(),
    deleteRoom: deleteRoom(),

    addSection: addSection(),

    addCard: addCard(),
    editCard: editCard(),
    deleteCard: deleteCard(),

    createRoomTimestamp: createRoomTimestamp(),

    addUser: addUser(),

    saveGptHistory: saveGptHistory(),
  };

  return graphqlHTTP(() => ({
    schema,
    rootValue: {...queries, ...mutations},

    customParseFn(src) {
      const dom = parse(src);
      return dom;
    },
    customFormatErrorFn(err) {
      const {originalError} = err;
      if (!(originalError instanceof OpenAiError)) return err;
      return {message: originalError.message, ...originalError.info};
    },
  }));
}
