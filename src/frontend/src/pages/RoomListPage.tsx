//Author: Nico Mangold
import React, {useEffect, useRef, useState} from 'react';
import {
  LogoutWrapper,
  RoomElement,
  RoomElementIcons,
  RoomScroll,
  Wrapper,
} from './RoomListPage.styles';
import {
  ColumnItemsCenterFlex,
  ColumnItemsCenterSpacedFlex,
  RowItemsFillSpaceBetween,
  RowItemsSpaced,
} from '../components/general/Layout.styles';
import {Badge} from '../components/Badge.styles';
import LeaveIcon from '../icons/leave.svg';
import DeleteIcon from '../icons/trash.svg';
import {IconButton} from '../components/general/Buttons.styles';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {RouterRoutes} from '../constants/routerRoutes';
import {RoomListSearchParams, RoomSearchParams} from '../constants/searchParams';
import getRoomList from '../api-v2/queries/queries/getRoomList';
import isAuthenticated from '../api-v2/queries/queries/isAuthenticated';
import leaveRoom from '../api-v2/queries/mutations/leaveRoom';
import deleteRoom from '../api-v2/queries/mutations/deleteRoom';
import {addRoomHelper, removeRoomHelper} from '../utilities/helpers';
import {LoadingSpinner, LoadingSpinnerWrapper} from '../components/general/LoadingSpinner.styles';
import {CreateRoomPopup, JoinRoomPopup} from '../components/Popups/RoomListPopups';

export type RoomElement = {
  id: string;
  name: string;
  keywords: Array<string>;
  isCreator: boolean;
};

//Page that shows joined rooms and allows to join, create, leave and delete rooms
export function RoomListPage() {
  //variables
  const [rooms, setRooms] = useState<Array<RoomElement>>([]);
  const roomsRef = useRef(rooms);
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  //on first render
  useEffect(() => {
    //if not authenticated, navigate to Login Page
    isAuthenticated().then(isAuthenticated => {
      if (!isAuthenticated) {
        navigate(`${RouterRoutes.Login}`);
      }
    });

    //fetch roomList
    getRoomList().then(
      //onSuccess, initialize list and hode loading spinner
      roomElements => {
        setRooms(roomElements);
        setIsLoading(false);
      },
      //onError, alert user and hide loading spinner
      err => {
        console.warn('Following error occured fetching joined rooms: ', err);
        alert('An error occured. Please try to reload the page.');
        setIsLoading(false);
      },
    );
  }, []);

  //roomsRef is needed to access the roomList state at the time a callback gets executed not defined
  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);

  //handlers

  async function handleOnLeave(
    event: React.FormEvent<HTMLImageElement>,
    roomId: string,
  ): Promise<void> {
    event.stopPropagation();
    //save state of list
    const cachedRoomElement = rooms.find(room => room.id === roomId);
    if (!cachedRoomElement) return;
    const cachedRoomElementIndex = rooms.indexOf(cachedRoomElement);

    //remove room from list locally
    setRooms(removeRoomHelper([...rooms], roomId));

    //leave room globally
    leaveRoom({roomId: roomId}).then(
      //on false/error alert user and restore state of list
      response => {
        if (!response.leaveRoom) {
          console.log(`Leaving roomElement failed. Old state got restored`);
          alert('Failed to leave the room. Please try again');
          setRooms(addRoomHelper(roomsRef.current, cachedRoomElement, cachedRoomElementIndex));
        }
      },
      err => {
        console.log(`Leaving roomElement failed with error ${err}. Old state got restored`);
        alert('An error occured leaving the room. Please try again');
        setRooms(addRoomHelper(roomsRef.current, cachedRoomElement, cachedRoomElementIndex));
      },
    );
  }
  async function handleOnDelete(
    event: React.FormEvent<HTMLImageElement>,
    roomId: string,
  ): Promise<void> {
    event.stopPropagation();
    //save state of list
    const cachedRoomElement = rooms.find(room => room.id === roomId);
    if (!cachedRoomElement) return;
    const cachedRoomElementIndex = rooms.indexOf(cachedRoomElement);

    //remove room from list locally
    setRooms(removeRoomHelper([...rooms], roomId));

    //delete room globally
    deleteRoom({roomId: roomId}).then(
      //on false/error alert user and restore state of list
      response => {
        if (!response.deleteRoom) {
          console.log(`Deleting roomElement failed. Old state got restored`);
          alert('Failed to delete the room. Please try again');
          setRooms(addRoomHelper(roomsRef.current, cachedRoomElement, cachedRoomElementIndex));
        }
      },
      err => {
        console.log(`Deleting roomElement failed with error ${err}. Old state got restored`);
        alert('An error occured deleting the room. Please try again');
        setRooms(addRoomHelper(roomsRef.current, cachedRoomElement, cachedRoomElementIndex));
      },
    );
  }

  function handleOpenJoinRoomPopup(): void {
    setShowJoinRoom(true);
  }
  function handleCloseJoinRoomPopup(): void {
    setShowJoinRoom(false);
  }

  function handleOpenCreateRoomPopup(): void {
    setShowCreateRoom(true);
  }
  function handleCloseCreateRoomPopup(): void {
    setShowCreateRoom(false);
  }

  async function handleEnterRoom(roomId: string): Promise<void> {
    //navigate to clicked room (room page)
    const userId = searchParams.get(RoomListSearchParams.UserId);
    if (!userId) return;

    navigate(
      `${RouterRoutes.Room}?${RoomSearchParams.UserId}=${userId}&${RoomSearchParams.RoomId}=${roomId}`,
    );
  }

  function handleLogout() {
    //navigate to login
    navigate(`${RouterRoutes.Login}`);
  }

  //components

  return (
    <>
      <Wrapper>
        <ColumnItemsCenterSpacedFlex>
          <div>Rooms</div>
          <RoomScroll>
            {isLoading ? (
              <LoadingSpinnerWrapper>
                <LoadingSpinner />
              </LoadingSpinnerWrapper>
            ) : (
              rooms.map(room => (
                <RoomElement
                  key={room.id}
                  onClick={() => handleEnterRoom(room.id)}
                  title='Enter Room'
                >
                  <ColumnItemsCenterFlex>
                    {room.name}
                    <RowItemsFillSpaceBetween>
                      <div></div>
                      {room.keywords.map(keyword => (
                        <Badge key={keyword}>{keyword}</Badge>
                      ))}
                      <div></div>
                    </RowItemsFillSpaceBetween>
                  </ColumnItemsCenterFlex>
                  <RoomElementIcons>
                    {room.isCreator ? (
                      <img
                        src={DeleteIcon}
                        onClick={event => handleOnDelete(event, room.id)}
                        title='Delete Room'
                      />
                    ) : (
                      <img
                        src={LeaveIcon}
                        onClick={event => handleOnLeave(event, room.id)}
                        title='Leave Room'
                      />
                    )}
                  </RoomElementIcons>
                </RoomElement>
              ))
            )}
          </RoomScroll>
          <RowItemsSpaced>
            <IconButton onClick={handleOpenJoinRoomPopup}>JOIN ROOM</IconButton>
            <IconButton onClick={handleOpenCreateRoomPopup}>CREATE ROOM</IconButton>
          </RowItemsSpaced>
        </ColumnItemsCenterSpacedFlex>
      </Wrapper>
      <LogoutWrapper onClick={handleLogout}>
        <img src={LeaveIcon} title='Logout' />
      </LogoutWrapper>
      {showJoinRoom ? <JoinRoomPopup onClose={handleCloseJoinRoomPopup} /> : null}
      {showCreateRoom ? <CreateRoomPopup onClose={handleCloseCreateRoomPopup} /> : null}
    </>
  );
}
