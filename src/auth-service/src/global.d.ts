//Author Erik Priemer

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JWT_KEY: string;
    }
  }
}

export {};
