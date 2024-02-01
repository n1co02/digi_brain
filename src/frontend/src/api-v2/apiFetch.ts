//Author: Nico Mangold
import {print} from 'graphql/language/printer';
import type {TypedDocumentNode as DocumentNode} from '@graphql-typed-document-node/core';

export default async function apiFetch<T, U>(
  url: string,
  document: DocumentNode<T, U>,
  variables: U,
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',

    body: JSON.stringify({
      query: print(document),
      variables: variables as unknown as string,
    }),
  });

  const result = (await response.json()) as {data: T};
  return result.data;
}
