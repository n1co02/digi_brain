//Author: Nico Mangold
import {useState, useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import createRoomTimeStamp from '../../api-v2/queries/mutations/createRoomTimestamp';
import {RoomSearchParams} from '../../constants/searchParams';
import {font} from '../../constants/style/font';
import {KeywordInput} from '../../pages/RoomListPage.styles';
import {SectionType} from '../../pages/RoomPage';
import {HistoryScroll, HistoryRoomElement} from '../../pages/RoomPage.styles';
import {Badge} from '../Badge.styles';
import IconInput from '../IconInput';
import {Popup} from '../Popup';
import {Button, ButtonSmaller, ButtonSmallerSecondary} from '../general/Buttons.styles';
import {
  ColumnItemsCenterSpaced,
  RowItemsSpaced,
  RowItemsSpacedHalf,
  RowItemsSpacedHalfEnd,
  ColumnItemsFlex,
  RowItemsEnd,
  ColumnItemsFlexSpacedHalf,
} from '../general/Layout.styles';
import {Select} from '../general/Select.styles';
import React from 'react';
import SearchIcon from '../../icons/search.svg';
import TagIcon from '../../icons/tag.svg';
import {
  LoadingSpinnerWrapper,
  LoadingSpinnerSmall,
  LoadingSpinnerSmallest,
} from '../general/LoadingSpinner.styles';
import getRoomHistory from '../../api-v2/queries/queries/getRoomHistory';
import getRoomTimestamp from '../../api-v2/queries/queries/getRoomTimestamp';
import {SubscriptionEventHandler} from '../../utilities/SubscriptionEventHandler';
import {pxToRem} from '../../utilities/metric';

const enum Sort {
  DateDescending = '0',
  DateAscending = '1',
  HitsDescending = '2',
  HitsAscending = '3',
}

type RoomHistoryElement = {
  label: string;
  timestamp: number;
  value: number;
};

//Pupup for creating timestamp
type CreateTimestampPopupProps = {
  sections: Array<SectionType>;
  onClose: () => void;
};
export function CreateTimestampPopup({
  sections,
  onClose: handleClose,
}: CreateTimestampPopupProps): JSX.Element {
  const [label, setLabel] = useState('');
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get(RoomSearchParams.RoomId);
  const [isLoading, setIsLoading] = useState(false);

  function handleChangeLabel(event: React.FormEvent<HTMLInputElement>): void {
    setLabel(event.currentTarget.value);
  }
  function handleOnCreate(): void {
    if (!roomId) return;

    setIsLoading(true);
    createRoomTimeStamp({roomId, label, timestamp: Date.now(), room: sections}).then(
      success => {
        if (!success) {
          alert('Failed to save Timestamp, try again.');
          setIsLoading(false);
        } else {
          handleClose();
        }
      },
      err => {
        alert('Failed to save Timestamp. Error: ' + err);
        handleClose();
      },
    );
  }

  return (
    <Popup onClose={handleClose}>
      <ColumnItemsCenterSpaced>
        <div>Create Timestamp</div>
        <IconInput
          value={label}
          placeHolder='Label'
          iconSrc={TagIcon}
          onChange={handleChangeLabel}
        />
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

//popup for selecting timestamp
type SelectTimestampPopupProps = {
  eventHandler: SubscriptionEventHandler;
  onClose: () => void;
  onSetTimestamp: (sections: Array<SectionType>) => void;
};
export function SelectTimestampPopup({
  eventHandler,
  onClose: handleClose,
  onSetTimestamp: handleSetTimestamp,
}: SelectTimestampPopupProps): JSX.Element {
  //variables
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get(RoomSearchParams.RoomId);
  const [filterInput, setFilterInput] = useState('');
  const [sortedHistory, setSortedHistory] = useState<Array<RoomHistoryElement> | undefined>(
    undefined,
  );
  const [focusedElement, setFocusedElement] = useState<RoomHistoryElement>();
  const [sortingType, setSortingType] = useState<string>(Sort.DateDescending);
  const [showAlert, setShowAlert] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  //on first render
  useEffect(() => {
    if (!roomId) return;

    getRoomHistory({roomId: roomId, search: undefined}).then(
      result => {
        setSortedHistory(sortHistory(result));
      },
      err => {
        alert(`Following error occured fetching the room history: ${err}`);
        handleClose();
      },
    );
  }, []);

  //on changing sorting type
  useEffect(() => {
    if (!sortedHistory) return;
    setSortedHistory(sortHistory(sortedHistory));
  }, [sortingType]);

  //sorts list with selected sorting type
  function sortHistory(history: Array<RoomHistoryElement>): Array<RoomHistoryElement> {
    if (sortingType === Sort.DateAscending) {
      setSortedHistory(
        history.sort(function (a, b) {
          return a.timestamp.valueOf() - b.timestamp.valueOf();
        }),
      );
    } else if (sortingType === Sort.DateDescending) {
      setSortedHistory(
        history.sort(function (a, b) {
          return b.timestamp.valueOf() - a.timestamp.valueOf();
        }),
      );
    } else if (sortingType === Sort.HitsAscending) {
      setSortedHistory(
        history.sort(function (a, b) {
          return (a.value ?? -1) - (b.value ?? -1);
        }),
      );
    } else if (sortingType === Sort.HitsDescending) {
      setSortedHistory(
        history.sort(function (a, b) {
          return (b.value ?? -1) - (a.value ?? -1);
        }),
      );
    }
    return [...history];
  }

  function handleOnConfirm(): void {
    if (!roomId || !focusedElement) return;
    getRoomTimestamp({
      input: {roomId: roomId, timestamp: focusedElement.timestamp},
      eventHandler,
    }).then(
      result => {
        handleSetTimestamp(result);
        handleClose();
      },
      err => {
        alert('Failed to set room to selected timestamp. Try again. ' + err);
      },
    );
  }

  function handleOnVerify(): void {
    setShowAlert(true);
  }
  function handleOnCancel(): void {
    setShowAlert(false);
  }

  function handleChangeFilterInput(event: React.FormEvent<HTMLInputElement>): void {
    setFilterInput(event.currentTarget.value);
  }
  function handleKeyDownSection(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleOnSearch();
    }
  }
  function handleOnSearch() {
    if (!roomId) return;

    setIsFiltering(true);
    getRoomHistory({roomId: roomId, search: filterInput === '' ? undefined : filterInput}).then(
      result => {
        setSortedHistory(sortHistory(result));
        setIsFiltering(false);
        setSortingType(filterInput === '' ? Sort.DateDescending : Sort.HitsDescending);
      },
      err => {
        alert(`Following error occured fetching the room history: ${err}`);
        handleClose();
      },
    );
  }

  function handleHistoryElementClick(historyElement: RoomHistoryElement) {
    setFocusedElement(historyElement);
  }

  function handleChangeSortingType(event: React.FormEvent<HTMLSelectElement>) {
    setSortingType(event.currentTarget.value);
  }

  return (
    <Popup onClose={handleClose}>
      <ColumnItemsCenterSpaced>
        <div>Select Timestamp</div>
        <RowItemsSpaced>
          <RowItemsSpacedHalf>
            <KeywordInput
              type={'text'}
              id='filter'
              onChange={handleChangeFilterInput}
              value={filterInput}
              placeholder={'Search'}
              onKeyDown={handleKeyDownSection}
            />
            {isFiltering ? (
              <LoadingSpinnerSmallest />
            ) : (
              <img src={SearchIcon} onClick={handleOnSearch} />
            )}
          </RowItemsSpacedHalf>
          <RowItemsSpacedHalfEnd>
            <div style={{fontSize: pxToRem(font.sizeSmaller)}}>Sort by:</div>
            <Select id='sortSelect' onChange={handleChangeSortingType} value={sortingType}>
              <option value={Sort.DateDescending}>date: new to old</option>
              <option value={Sort.DateAscending}>date: old to new</option>
              <option value={Sort.HitsDescending}>hits: high to low</option>
              <option value={Sort.HitsAscending}>hits: low to high</option>
            </Select>
          </RowItemsSpacedHalfEnd>
        </RowItemsSpaced>

        {!sortedHistory ? (
          <LoadingSpinnerWrapper>
            <LoadingSpinnerSmall />
          </LoadingSpinnerWrapper>
        ) : sortedHistory.length > 0 ? (
          <HistoryScroll>
            <ColumnItemsFlex>
              {sortedHistory.map((element, index) => {
                const date = new Date(element.timestamp);
                return (
                  <HistoryRoomElement
                    active={element === focusedElement}
                    key={index}
                    onClick={() => handleHistoryElementClick(element)}
                  >
                    <RowItemsSpacedHalf>
                      {element.value >= 0 ? <Badge>{element.value}</Badge> : null}
                      <div>{element.label}</div>
                    </RowItemsSpacedHalf>
                    <RowItemsEnd>
                      <div>{date.toDateString()}</div>
                    </RowItemsEnd>
                  </HistoryRoomElement>
                );
              })}
            </ColumnItemsFlex>
          </HistoryScroll>
        ) : (
          <div>You have no saved Timestamps</div>
        )}

        {showAlert ? (
          <>
            <ColumnItemsFlexSpacedHalf>
              <div style={{fontSize: pxToRem(font.sizeSmaller)}}>
                Are you sure you want to change to a saved Timestamp?
              </div>
              <div style={{fontSize: pxToRem(font.sizeSmaller), fontWeight: font.bold}}>
                Unsaved changes will be lost!
              </div>
              <ButtonSmallerSecondary onClick={handleOnCancel} style={{flexShrink: 0}}>
                CANCEL
              </ButtonSmallerSecondary>
              <ButtonSmaller
                disabled={focusedElement ? false : true}
                onClick={handleOnConfirm}
                style={{flexShrink: 0}}
              >
                CONFIRM
              </ButtonSmaller>
            </ColumnItemsFlexSpacedHalf>
          </>
        ) : (
          <ButtonSmaller
            disabled={focusedElement ? false : true}
            onClick={handleOnVerify}
            style={{flexShrink: 0}}
          >
            CONFIRM
          </ButtonSmaller>
        )}
      </ColumnItemsCenterSpaced>
    </Popup>
  );
}
