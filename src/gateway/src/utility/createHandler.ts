// use hander to wrap functions without having to pass classes all the time.
// add the params where marked
/*Author Erik Priemer*/

import type {PubSub} from 'graphql-subscriptions';

export default function createHandler<B, T, V, U>(
  handle: (_parent: B, value: T, args: V, pubsub: PubSub /*add params */) => U | Promise<U>,
): (pubsup: PubSub /* add params */) => (_parent: B, value: T, args: V) => Promise<U> {
  return (pubsub /* add params*/) => async (_parent, value, args) =>
    handle(_parent, value, args, pubsub /*add params */);
}
