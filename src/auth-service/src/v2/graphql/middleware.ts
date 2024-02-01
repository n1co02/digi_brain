//Author Erik Priemer

import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {graphqlHTTP} from 'express-graphql';
import {projectPath} from '../../projectPath';
import {loadSchema} from '@graphql-tools/load';
import {parse} from 'graphql';
import OpenAiError from '../../utility/ServerError';
import login from './queries/login';
import registration from './queries/registration';

export default async function graphql(): Promise<ReturnType<typeof graphqlHTTP>> {
  //add params
  const schema = await loadSchema(projectPath('graphql-scheme/scheme.graphql'), {
    loaders: [new GraphQLFileLoader()],
  });
  const queries = {
    login: login(),
    registration: registration(),
  };

  const mutations = {
    // add mutations
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
