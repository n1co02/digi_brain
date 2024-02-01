//Author Erik Priemer

import {config} from 'dotenv';
config();

// Functions that return the urls of the different services / functions

export function getFrontendUrl(): string {
  switch (process.env.MODE) {
    case 'developement':
      return 'http://localhost';
    case 'docker-network':
      return 'http://localhost';
    case 'production':
      return 'http://74.235.63.148';
    default:
      return 'http://localhost';
  }
}

export function getAuthServiceUrl(): string {
  switch (process.env.MODE) {
    case 'developement':
      return 'http://localhost:4042/v2/graphql';
    case 'docker-network':
      return 'http://digibrain-authservice-1:4042/v2/graphql';
    case 'production':
      return 'http://74.235.63.148:4042/v2/graphql';
    default:
      return 'http://localhost:4042/v2/graphql';
  }
}

export function getGptServiceUrl(): string {
  switch (process.env.MODE) {
    case 'developement':
      return 'http://localhost:4044/v2/graphql';
    case 'docker-network':
      return 'http://digibrain-gptservice-1:4044/v2/graphql';
    case 'production':
      return 'http://74.235.63.148:4044/v2/graphql';
    default:
      return 'http://localhost:4044/v2/graphql';
  }
}

export function getRoomServiceUrl(): string {
  switch (process.env.MODE) {
    case 'developement':
      return 'http://localhost:4043/v2/graphql';
    case 'docker-network':
      return 'http://digibrain-roomservice-1:4043/v2/graphql';
    case 'production':
      return 'http://74.235.63.148:4043/v2/graphql';
    default:
      return 'http://localhost:4043/v2/graphql';
  }
}
