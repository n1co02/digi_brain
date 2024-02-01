//Author: Nico Mangold
import {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import createRoom from '../../api-v2/queries/mutations/createRoom';
import joinRoom from '../../api-v2/queries/mutations/joinRoom';
import {RouterRoutes} from '../../constants/routerRoutes';
import {RoomListSearchParams, RoomSearchParams} from '../../constants/searchParams';
import {font} from '../../constants/style/font';
import {KeywordInput} from '../../pages/RoomListPage.styles';
import {Badge} from '../Badge.styles';
import IconInput from '../IconInput';
import {Popup} from '../Popup';
import {Button} from '../general/Buttons.styles';
import {
  ColumnItemsCenterSpaced,
  ColumnItemsFlexSpacedHalf,
  RowItemsSpacedHalf,
} from '../general/Layout.styles';
import {LoadingSpinnerWrapper, LoadingSpinnerSmall} from '../general/LoadingSpinner.styles';
import CodeIcon from '../../icons/code.svg';
import CheckIcon from '../../icons/check.svg';
import TagIcon from '../../icons/tag.svg';
import React from 'react';
import {pxToRem} from '../../utilities/metric';

//Popup for joining room
type JoinRoomPopupProps = {
  onClose: () => void;
};
export function JoinRoomPopup({onClose: handleClose}: JoinRoomPopupProps): JSX.Element {
  const [id, setId] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeId(event: React.FormEvent<HTMLInputElement>): void {
    setId(event.currentTarget.value);
  }

  async function handleJoinRoom(): Promise<void> {
    const userId = searchParams.get(RoomListSearchParams.UserId);
    if (!userId) return;

    setIsLoading(true);
    joinRoom({roomId: id}).then(
      success => {
        if (success) {
          navigate(
            `${RouterRoutes.Room}?${RoomSearchParams.UserId}=${userId}&${RoomSearchParams.RoomId}=${id}`,
          );
        } else {
          handleClose();
          console.warn('Failed to join room with id ' + id);
        }
      },
      err => {
        handleClose();
        console.warn('Failed to join room with id ' + id + ' with following error: ' + err);
      },
    );
  }

  return (
    <Popup onClose={handleClose}>
      <ColumnItemsCenterSpaced>
        <div>Join Room</div>
        <IconInput value={id} placeHolder='ID' iconSrc={CodeIcon} onChange={handleChangeId} />
        <Button onClick={handleJoinRoom} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinnerWrapper>
              <LoadingSpinnerSmall />
            </LoadingSpinnerWrapper>
          ) : (
            'JOIN'
          )}
        </Button>
      </ColumnItemsCenterSpaced>
    </Popup>
  );
}

//popup for creating room
type CreateRoomPopupProps = {
  onClose: () => void;
};
export function CreateRoomPopup({onClose: handleClose}: CreateRoomPopupProps): JSX.Element {
  const [name, setName] = useState('');
  const [keywords, setKeywords] = useState<Array<string>>([]);
  const [keywordInput, setKeywordInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleChangeName(event: React.FormEvent<HTMLInputElement>): void {
    setName(event.currentTarget.value);
  }
  async function handleOnCreate(): Promise<void> {
    const userId = searchParams.get(RoomListSearchParams.UserId);

    setIsLoading(true);
    createRoom({roomName: name, keywords: keywords}).then(
      roomId => {
        if (roomId) {
          navigate(
            `${RouterRoutes.Room}?${RoomSearchParams.UserId}=${userId}&${RoomSearchParams.RoomId}=${roomId}`,
          );
        } else {
          handleClose();
          console.warn('Failed to create room');
        }
      },
      err => {
        handleClose();
        console.warn('Failed to create room with following error: ' + err);
      },
    );
    setIsLoading(false);
  }

  function handleChangeKeywordInput(event: React.FormEvent<HTMLInputElement>): void {
    setKeywordInput(event.currentTarget.value);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleConfirmKeyword();
    }
  }
  function handleConfirmKeyword(): void {
    if (keywordInput !== '' && !keywords.includes(keywordInput)) {
      const tempArray = keywords;
      tempArray.push(keywordInput);
      setKeywords(tempArray);
      setKeywordInput('');
    }
  }

  return (
    <Popup onClose={handleClose}>
      <ColumnItemsCenterSpaced>
        <div>Create Room</div>
        <IconInput value={name} placeHolder='Name' iconSrc={TagIcon} onChange={handleChangeName} />
        <ColumnItemsFlexSpacedHalf>
          <div style={{fontSize: pxToRem(font.sizeNormal)}}>Keywords</div>
          <RowItemsSpacedHalf>
            <KeywordInput
              type={'text'}
              id='keyword'
              onChange={handleChangeKeywordInput}
              value={keywordInput}
              placeholder={'Enter Keyword'}
              onKeyDown={handleKeyDown}
            />
            <img style={{cursor: 'pointer'}} src={CheckIcon} onClick={handleConfirmKeyword} />
          </RowItemsSpacedHalf>
          <RowItemsSpacedHalf>
            {keywords.map(keyword => (
              <Badge key={keyword}>{keyword}</Badge>
            ))}
          </RowItemsSpacedHalf>
        </ColumnItemsFlexSpacedHalf>
        <Button onClick={handleOnCreate} disabled={isLoading}>
          {isLoading ? (
            <LoadingSpinnerWrapper>
              <LoadingSpinnerSmall />
            </LoadingSpinnerWrapper>
          ) : (
            'CREATE'
          )}
        </Button>
      </ColumnItemsCenterSpaced>
    </Popup>
  );
}
