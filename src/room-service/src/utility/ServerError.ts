//Author Erik Priemer+Nicolas Ostermann
export default class ServerError extends Error {
  public constructor(message: 'CREATOR_CANNOT_LEAVE', info: {info: number});
  public constructor(message: 'ROOM_DOES_NOT_EXIST', info: {info: number});
  public constructor(message: 'SECTION_DOES_NOT_EXIST', info: {info: number});
  public constructor(message: 'CARD_DOES_NOT_EXIST', info: {info: number});
  public constructor(message: 'USER_DOES_NOT_EXIST', info: {info: number});
  public constructor(message: 'DATABASE_ERROR', info: {info: number});
  public constructor(message: 'ROOMID_ALREADY_IN_USE', info: {info: number});
  public constructor(message: 'INVALID_ROOM_OR_USER', info: {info: number});
  public constructor(message: 'ONLY_CREATOR_CAN_DELETE', info: {info: number});
  public constructor(message: 'UNAUTHORIZED', info: {info: number});
  public constructor(message: 'USER_ALREADY_EXISTS', info: {info: number});

  public constructor(message: string, public readonly info: Record<string, unknown> = {}) {
    super(message);
  }
}
