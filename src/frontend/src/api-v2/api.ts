// Functions that return the urls of the different services / functions

console.log(process.env.REACT_APP_MODE);

export function getGatewayServiceUrl(): string {
  switch (process.env.REACT_APP_MODE) {
    case 'developement':
      return 'http://localhost:4041/graphql';
    case 'docker-network':
      return 'http://localhost:4041/graphql';
    case 'production':
      return 'http://74.235.63.148:4041/graphql';
    default:
      return 'http://localhost:4041/graphql';
  }
}

export function getGatewayServiceWsUrl(): string {
  switch (process.env.REACT_APP_MODE) {
    case 'developement':
      return 'ws://localhost:4041/graphql';
    case 'docker-network':
      return 'ws://localhost:4041/graphql';
    case 'production':
      return 'ws://74.235.63.148:4041/graphql';
    default:
      return 'ws://localhost:4041/graphql';
  }
}

export function getGatewayServiceLoginUrl(): string {
  switch (process.env.REACT_APP_MODE) {
    case 'developement':
      return 'http://localhost:4041/login';
    case 'docker-network':
      return 'http://localhost:4041/login';
    case 'production':
      return 'http://74.235.63.148:4041/login';
    default:
      return 'http://localhost:4041/login';
  }
}

export function getGatewayServiceRegistrationUrl(): string {
  switch (process.env.REACT_APP_MODE) {
    case 'developement':
      return 'http://localhost:4041/registration';
    case 'docker-network':
      return 'http://localhost:4041/registration';
    case 'production':
      return 'http://74.235.63.148:4041/registration';
    default:
      return 'http://localhost:4041/registration';
  }
}

export function getGatewayServiceIsAuthenticatedUrl(): string {
  switch (process.env.REACT_APP_MODE) {
    case 'developement':
      return 'http://localhost:4041/isauthenticated';
    case 'docker-network':
      return 'http://localhost:4041/isauthenticated';
    case 'production':
      return 'http://74.235.63.148:4041/isauthenticated';
    default:
      return 'http://localhost:4041/isauthenticated';
  }
}
