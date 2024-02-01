/*Author Erik Priemer*/

import {MessageType, Color} from '../types';

export default function log(msg: string | Array<string> | unknown, color: MessageType): void {
  switch (color) {
    case MessageType.Start:
      console.log(Color.Gray, msg, Color.Reset);
      break;
    case MessageType.Success:
      console.log(Color.Green, msg, Color.Reset);
      break;
    case MessageType.Info:
      console.log(Color.Blue, msg, Color.Reset);
      break;
    case MessageType.Warning:
      console.log(Color.Orange, msg, Color.Reset);
      break;
    case MessageType.Error:
      console.log(Color.Red, msg, Color.Reset);
      break;
    case MessageType.End:
      console.log(Color.LightYellow, msg, Color.Reset);
      break;
  }
}
