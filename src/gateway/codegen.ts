import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./graphql-scheme-api/scheme.graphql'],
  documents: ['./src/api-v2/queries/**.graphql', './src/api-v2/mutations/**.graphql'],

  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],

      config: {
        scalars: {},
      },
    },
  },
};
export default config;
