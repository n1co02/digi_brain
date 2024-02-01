/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/*Author Erik Priemer*/

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_JWT_KEY: string;
      MODE: string;
    }
  }
}

export {};
