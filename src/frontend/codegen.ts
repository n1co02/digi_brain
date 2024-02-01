/*Author Erik Priemer*/

import {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./graphql-scheme/scheme.graphql'],
  documents: [
    './src/api-v2/gql-queries/queries/**.graphql',
    './src/api-v2/gql-queries/mutations/**.graphql',
  ],

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
