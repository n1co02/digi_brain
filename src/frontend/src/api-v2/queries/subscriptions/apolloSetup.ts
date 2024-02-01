import {ApolloClient, HttpLink, InMemoryCache, split} from '@apollo/client';
import {getMainDefinition} from 'apollo-utilities';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import {createClient} from 'graphql-ws';
import {getGatewayServiceUrl, getGatewayServiceWsUrl} from '../../api';

const wsLink = new GraphQLWsLink(
  createClient({
    url: getGatewayServiceWsUrl(),
  }),
);

const httpLink = new HttpLink({
  uri: getGatewayServiceUrl(),
});

const link = split(
  ({query}) => {
    const def = getMainDefinition(query);
    return def.kind === 'OperationDefinition' && def.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
});
