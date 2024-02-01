//Author Erik Priemer+Nicolas Ostermann

export default class ServerError extends Error {
  // public constructor(message: 'TEST_ERROR_UNO', info: {info: number});
  public constructor(message: 'SQLITE_USER_NOT_FOUND', info: {info: number});
  public constructor(message: 'SQLITE_INVALID_PASSWORDS', info: {info: number});
  public constructor(message: 'LOGIN_FAILED', info: {info: number});

  public constructor(message: string, public readonly info: Record<string, unknown> = {}) {
    super(message);
  }
}
