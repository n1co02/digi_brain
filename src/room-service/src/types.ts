//Author Erik Priemer

export const enum ModelStatus {
  SUCCEEDED = 'succeeded',
}

// for log()
export enum Color {
  Reset = '\x1b[0m',

  Black = '\x1b[30m',
  Red = '\x1b[38;5;265m',
  Orange = '\x1b[38;5;215m',
  Green = '\x1b[38;5;113m',
  LightGreen = '\x1b[38;5;46m',
  DarkGreen = '\x1b[38;5;22m',
  LightYellow = '\x1b[38;5;226m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Violet = '\x1b[38;5;129m',
  DarkerViolot = '\x1b[38;5;165m',
  White = '\x1b[37m',
  Gray = '\x1b[38;5;245m',
}

export enum MessageType {
  Success = 'success',
  Info = 'info',
  Error = 'error',
  Start = 'start',
  Warning = 'warning',
  End = 'end',
}
