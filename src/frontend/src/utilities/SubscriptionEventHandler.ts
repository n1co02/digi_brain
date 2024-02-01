//Author: Nico Mangold
import getRoom from '../api-v2/queries/queries/getRoom';
import {RoomType} from '../pages/RoomPage';

///Provides logic to handle subscription events

type SubscriptionEventHandlerProps = {
  userId: string;
  roomId: string;
  onUpdateRoom: (room: RoomType) => void;
};

export class SubscriptionEventHandler {
  private localChanges: number;
  private roomEvent: boolean;
  private isRequesting: boolean;

  private selfId: string;
  private roomId: string;

  private onUpdateRoom: (room: RoomType) => void;

  constructor({userId, roomId, onUpdateRoom}: SubscriptionEventHandlerProps) {
    this.localChanges = 0;
    this.roomEvent = false;
    this.isRequesting = false;

    this.selfId = userId;
    this.roomId = roomId;

    this.onUpdateRoom = onUpdateRoom;
  }

  private async requestRoom() {
    this.isRequesting = true;

    try {
      //request room
      const fetchedRoom = await getRoom({roomId: this.roomId});

      //if no changes where made while fetching room, update it
      if (this.localChanges === 0) {
        this.onUpdateRoom(fetchedRoom);
        this.roomEvent = false;
      } //else wait
    } catch (err) {
      console.warn('Failed to update room due to error ', err);
    }

    this.isRequesting = false;
  }

  //when local changes made
  public makeLocalChange() {
    this.localChanges++;
  }
  //when server responses
  public synchronizeLocalChange() {
    this.localChanges--;

    //if there are no unsynched changes, a noted event and not already requesting, request room
    if (this.localChanges === 0 && this.roomEvent && !this.isRequesting) {
      this.requestRoom();
    }
  }

  public onSubscriptionEvent(userId: string) {
    //if event is from on action, ignore it
    if (userId === this.selfId) {
      return;
    }

    this.roomEvent = true; //note event

    //if no unsynched changes and not already requesting, request room
    if (this.localChanges === 0 && !this.isRequesting) {
      this.requestRoom();
    }
  }
}
