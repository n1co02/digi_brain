//Author: Nico Mangold
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {
  AddSectionPlusWrapper,
  GptPane,
  KeywordWrapper,
  PaneSwitch,
  PaneTextField,
  PaneTextFieldSelector,
  PaneTextFieldWrapper,
  PromptIconWrapper,
  PromptInput,
  RoomContent,
  RoomHeader,
  SectionElement,
  SectionWrapper,
} from './RoomPage.styles';
import {
  ColumnItemsFlexSpaced,
  ColumnItemsFlexSpacedHalf,
  RowItems,
  RowItemsSpacedHalf,
} from '../components/general/Layout.styles';
import {Badge, SecondaryBadge} from '../components/Badge.styles';
import CheckIcon from '../icons/checkGrey.svg';
import CloseIcon from '../icons/crossGrey.svg';
import EllipsisIconInactive from '../icons/ellipsisInactive.svg';
import EllipsisIconActive from '../icons/ellipsisActive.svg';
import MenuArrowInactiveIcon from '../icons/menuArrowInactive.svg';
import MenuArrowActiveIcon from '../icons/menuArrowActive.svg';
import ChevronBigIcon from '../icons/chevronBig.svg';
import ReloadIcon from '../icons/reload.svg';
import {RouterRoutes} from '../constants/routerRoutes';
import {RoomListSearchParams, RoomSearchParams} from '../constants/searchParams';
import {KeywordInput} from './RoomListPage.styles';
import {Menu, Item, Separator, Submenu, useContextMenu} from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import {Card, CardType} from '../components/Card';
import {AddCard} from '../components/AddCard';
import {font} from '../constants/style/font';
import PlusIcon from '../icons/plusBig.svg';
import ChevronSmallIcon from '../icons/chevronSmall.svg';
import isAuthenticated from '../api-v2/queries/queries/isAuthenticated';
import getRoom from '../api-v2/queries/queries/getRoom';
import getGptPrediction from '../api-v2/queries/queries/getGptPrediction';
import addSection from '../api-v2/queries/mutations/addSection';
import addCard from '../api-v2/queries/mutations/addCard';
import editCard from '../api-v2/queries/mutations/editCard';
import deleteCard from '../api-v2/queries/mutations/deleteCard';
import {
  addCardHelper,
  addSectionHelper,
  editCardHelper,
  removeCardHelper,
  removeSectionHelper,
  updateCardIdHelper,
  updateSectionIdHelper,
} from '../utilities/helpers';
import {
  LoadingSpinner,
  LoadingSpinnerSmallest,
  LoadingSpinnerWrapper,
} from '../components/general/LoadingSpinner.styles';
import {CreateTimestampPopup, SelectTimestampPopup} from '../components/Popups/TimeStampPopups';
import getGptBrainstorm from '../api-v2/queries/queries/getGptBrainstorm';
import {color} from '../constants/style/appTheme';
import apolloClient from '../api-v2/queries/subscriptions/apolloSetup';
import {ROOM_SUBSCRIPTION} from '../api-v2/queries/subscriptions/subscribeToRoom';
import {SubscriptionEventHandler} from '../utilities/SubscriptionEventHandler';
import {pxToRem} from '../utilities/metric';

//types
export type SectionType = {
  id: string;
  name: string;
  cards: Array<CardType>;
};
export type RoomType = {
  id: string;
  name: string;
  keywords: Array<string>;
  isCreator: boolean;
  gptHistory: Array<string>;
  sections: Array<SectionType>;
};

const EMPTY_ROOM: RoomType = {
  id: '',
  name: '',
  keywords: [],
  isCreator: true,
  gptHistory: [''],
  sections: [],
};

//Page to show contents of room

export function RoomPage(): JSX.Element | null {
  //variables
  const [searchParams] = useSearchParams();
  const selfId = searchParams.get(RoomSearchParams.UserId);
  const roomId = searchParams.get(RoomSearchParams.RoomId);
  if (!selfId || !roomId) return null;

  const [room, setRoom] = useState<RoomType>(EMPTY_ROOM);
  //roomRef to access current state in callback functions
  const roomRef = useRef(room);
  const [filteredRoom, setFilteredRoom] = useState<RoomType>({...room});

  const [showGptPane, setShowGptPane] = useState(true);
  const [gptPrompt, setGptPrompt] = useState('');
  const [gptPrediction, setGptPediction] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [displayedGptBrainstorm, setDisplayedGptBrainstorm] = useState('');
  const [isBrainstorming, setIsBrainstorming] = useState(false);

  const [sectionInput, setSectionInput] = useState('');
  const [showSectionInput, setShowSectionInput] = useState(false);

  const [showCreateTimestamp, setShowCreateTimestamp] = useState(false);
  const [showSelectTimestamp, setShowSelectTimestamp] = useState(false);

  const [filter, setFilter] = useState('');

  const navigate = useNavigate();

  const {show} = useContextMenu({id: roomId});

  const eventHandler = useRef<SubscriptionEventHandler | undefined>();

  //update reference to room
  useEffect(() => {
    roomRef.current = room;
  }, [room]);

  //on first render
  useEffect(() => {
    //if not authenticated, navigate to login
    isAuthenticated().then(isAuthenticated => {
      if (!isAuthenticated) {
        navigate(`${RouterRoutes.Login}`);
      }
    });
    if (!roomId) return;

    //subscribe to room
    handleSubscription();

    //fetch room
    getRoom({roomId: roomId}).then(
      //onSuccess, initialize room
      fetchedRoom => {
        setRoom({
          ...fetchedRoom,
        });

        //If there is no GptBrainstorm, request one
        if (fetchedRoom.gptHistory.length === 0) {
          handleReloadGptBrainstorm();
        } else {
          setDisplayedGptBrainstorm(
            fetchedRoom.gptHistory[fetchedRoom.gptHistory.length - 1] ?? '',
          );
        }
      },
      //on error, alert user
      err => {
        console.warn('Following error occured fetching the room: ', err);
        alert('An error occured fetching the room. Please try again');
      },
    );
  }, []);

  //continuous applying of filter
  useEffect(() => {
    applyFilter();
  }, [filter, room]);

  //handlers

  function handleUpdateRoom(room: RoomType) {
    setRoom({...room});
  }

  function handleSubscription() {
    if (!roomId || !selfId) return;
    //initialize subscription event handler
    eventHandler.current = new SubscriptionEventHandler({
      userId: selfId,
      roomId,
      onUpdateRoom: handleUpdateRoom,
    });

    try {
      apolloClient.subscribe({query: ROOM_SUBSCRIPTION, variables: {roomId}}).subscribe({
        next({data}) {
          const userId = data.subscribeToRoom as string | undefined;
          if (!userId || !eventHandler.current) return;

          eventHandler.current.onSubscriptionEvent(userId);
        },
      });
    } catch {}
  }

  function applyFilter() {
    //if filter is empty, dont apply filter
    if (filter === '') {
      setFilteredRoom({...room});
      return;
    }

    //make deep copy of sections
    let deepCopiedSections = JSON.parse(JSON.stringify(room.sections)) as Array<SectionType>;
    //for every section
    deepCopiedSections.map(section => {
      //if filter is not substring of section name, filter cards (healine, text, label) of this section
      if (!section.name.includes(filter)) {
        section.cards = section.cards.filter(
          card =>
            card.headline.includes(filter) ||
            card.text.includes(filter) ||
            card.labels.findIndex(label => label.includes(filter)) !== -1,
        );
      }
    });
    //dont show sections with no results
    deepCopiedSections = deepCopiedSections.filter(
      section => section.name.includes(filter) || section.cards.length > 0,
    );
    //update room
    setFilteredRoom({...room, sections: deepCopiedSections});
  }

  function handleTimestampClick(event: React.MouseEvent<HTMLImageElement>) {
    //show context menu
    show({event});
  }
  function handleOnCreateTimestamp() {
    //show create timestamp popup
    setShowCreateTimestamp(true);
  }
  function handleOnSelectTimeStamp() {
    //show select timestamp popup
    setShowSelectTimestamp(true);
  }

  //handles toggle of side pane
  function handleTogglePane() {
    setShowGptPane(!showGptPane);
  }

  function handleChangePromptInput(event: React.FormEvent<HTMLInputElement>): void {
    setGptPrompt(event.currentTarget.value);
  }

  //handles enter click for prompt input
  function handleKeyDownPrompt(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleConfirmPrompt();
    }
  }
  async function handleConfirmPrompt(): Promise<void> {
    if (!roomId) return;
    //if prompt is not empty
    if (gptPrompt !== '') {
      //show loading spinner
      setIsAnswering(true);

      //empty input
      setGptPrompt('');

      //fetch prediction
      getGptPrediction({prompt: gptPrompt}).then(
        //on success, hide loading spinner and set text area
        result => {
          setIsAnswering(false);
          setGptPediction(result);
        },
        //on error, hide loading spinner and alert user
        err => {
          setIsAnswering(false);
          setGptPediction('An error occurred. Try again');
          console.error('Following error occurred requesting a GPT Prediction: ', err);
        },
      );
    }
  }

  //handles go back click on chevron
  function handleGoBack() {
    if (!selfId) return;
    navigate(`${RouterRoutes.RoomList}?${RoomListSearchParams.UserId}=${selfId}`);
  }
  function handleChangeSectionInput(event: React.FormEvent<HTMLInputElement>): void {
    setSectionInput(event.currentTarget.value);
  }
  //handles enter click for section input
  function handleKeyDownSection(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleAddSection();
    }
  }
  function handleAddSection() {
    //if input isnt empty and subscription event handler got initialized
    if (sectionInput !== '' && eventHandler.current !== undefined) {
      //add section locally with temporary id
      const temporarySectionId = 'temp' + room.sections.length;
      setRoom(addSectionHelper({...room}, temporarySectionId, sectionInput));

      //add section globally
      addSection({
        input: {
          roomId: room.id,
          sectionName: sectionInput,
        },
        eventHandler: eventHandler.current,
      }).then(
        sectionId => {
          //on false, revert locally made chane, alert user and fill sectionInput with failed name
          if (!sectionId) {
            console.log(`Adding section failed. Old state got restored`);
            setRoom(removeSectionHelper({...room}, temporarySectionId));
            setSectionInput(sectionInput);
            setShowSectionInput(true);
            alert('Failed to add section. Please try again');
          } else {
            //on success, update section id

            //update temporary id
            setRoom(updateSectionIdHelper({...room}, temporarySectionId, sectionId));

            //add locally added cards to now globally existing section
            room.sections.map(section => {
              if (section.id === sectionId) {
                for (const cardToAdd of section.cards) {
                  console.log('add local card');
                  addCardGlobally(
                    sectionId,
                    cardToAdd.headline,
                    cardToAdd.text,
                    cardToAdd.color,
                    cardToAdd.labels,
                    cardToAdd.id,
                  );
                }
              }
            });
          }
        },
        //on error, revert locally made chane, alert user and fill sectionInput with failed name
        err => {
          console.log(`Adding section failed with error ${err}. Old state got restored`);
          setRoom(removeSectionHelper({...room}, temporarySectionId));
          setSectionInput(sectionInput);
          setShowSectionInput(true);
          alert('An error occured adding the section. Please try again');
        },
      );

      setSectionInput('');
      setShowSectionInput(false);
    }
  }

  //handles adding card
  async function handleAddCard(
    header: string,
    text: string,
    color: string,
    labels: Array<string>,
    sectionIndex: number,
  ) {
    if (!selfId) return;

    const parentSection = room.sections[sectionIndex];

    //add card locally
    //id is temporary and is overwritten when element gets updated from backend
    const temporaryCardId = 'temp' + parentSection.id + parentSection.cards.length;
    const cardToAdd: CardType = {
      id: temporaryCardId,
      userName: '',
      userId: selfId,
      headline: header,
      text: text,
      color: color,
      labels: labels,
    };
    setRoom(addCardHelper({...room}, parentSection.id, cardToAdd));

    if (parentSection.id.startsWith('temp')) {
      //if section exists only locally, dont try to add card globally
      console.log('section is only existing locally, card is waiting to be added globally');
      return;
    }

    addCardGlobally(parentSection.id, header, text, color, labels, temporaryCardId);
  }

  //helper for adding card globally
  function addCardGlobally(
    sectionId: string,
    headline: string,
    text: string,
    color: string,
    labels: Array<string>,
    oldCardId: string,
  ) {
    if (!eventHandler.current) return;
    addCard({
      input: {roomId: room.id, sectionId, headline, text: text, color, labels, userName: ''},
      eventHandler: eventHandler.current,
    }).then(
      cardId => {
        if (cardId) {
          //If cardId gets returned, update temporary cardId
          setRoom(updateCardIdHelper({...room}, sectionId, oldCardId, cardId));
        } else {
          //if response is null, restore locally made changes
          console.log(`Adding card failed. Old state got restored`);
          setRoom(removeCardHelper({...room}, sectionId, oldCardId));
          alert('Failed to add card. Please try again');
        }
      },
      err => {
        //onRejected, revert locally made changes
        console.log(`Adding card failed with error ${err}. Old state got restored`);
        setRoom(removeCardHelper({...room}, sectionId, oldCardId));
        alert('An error occured adding the card. Please try again');
      },
    );
  }

  //handler for editing card
  async function handleEditCard(
    id: string,
    sectionIndex: number,
    header?: string,
    text?: string,
    color?: string,
    labels?: Array<string>,
  ) {
    const sectionId = room.sections[sectionIndex].id;

    //find card with id
    room.sections[sectionIndex].cards.map(card => {
      if (card.id === id && eventHandler.current !== undefined) {
        //edit card locally
        const editedCard: CardType = {
          ...card,
          headline: header ?? card.headline,
          text: text ?? card.text,
          color: color ?? card.color,
          labels: labels ?? card.labels,
        };
        setRoom(editCardHelper({...room}, sectionId, editedCard));

        //inform backend about change
        editCard({
          input: {
            roomId: room.id,
            cardId: id,
            sectionId: room.sections[sectionIndex].id,
            headline: header ?? card.headline,
            text: text ?? card.text,
            color: color ?? card.color,
            labels: labels ?? card.labels,
            userName: '',
          },
          eventHandler: eventHandler.current,
        }).then(
          success => {
            //if response is false, revert locally made changes
            if (!success) {
              console.log(`Editing card failed. Old state got restored`);
              //Can't just copy cached old room, because in the time between a request and a response, other changes can be made in a room that would get overwritten
              //Can't use indices of the time the request was made, cause these could be changed due to other transactions
              setRoom(editCardHelper({...room}, sectionId, card));
              alert('Failed to edit card. Please try again');
            }
          },
          err => {
            //onRejected, revert locally made changes
            console.log(`Editing card failed with error ${err}. Old state got restored`);
            setRoom(editCardHelper({...room}, sectionId, card));
            alert('An error occured editing the card. Please try again');
          },
        );
      }
    });
  }

  //handler for deleting card
  async function handleDeleteCard(id: string, sectionIndex: number) {
    //save card and its index
    const parentSection = room.sections[sectionIndex];
    const cachedCard = parentSection.cards.find(card => card.id === id);
    if (!cachedCard || !eventHandler.current) return;
    const cachedIndex = parentSection.cards.indexOf(cachedCard);

    //delete card locally
    setRoom(removeCardHelper({...room}, parentSection.id, id));

    deleteCard({
      input: {roomId: room.id, sectionId: parentSection.id, cardId: id},
      eventHandler: eventHandler.current,
    }).then(
      //if deletion not succesfull, restore cached card on cached positions
      success => {
        if (!success) {
          console.log(`Deleting card failed. Old state got restored`);
          setRoom(addCardHelper({...room}, parentSection.id, cachedCard, cachedIndex));
          alert('Failed to delete card. Please try again');
        }
      },
      err => {
        console.log(`Deleting card failed with error ${err}. Old state got restored`);
        setRoom(addCardHelper({...room}, parentSection.id, cachedCard, cachedIndex));
        alert('An error occured deleting card. Please try again');
      },
    );
  }

  function handleChangeFilter(event: React.FormEvent<HTMLInputElement>): void {
    setFilter(event.currentTarget.value);
  }

  //handler to reload gpt brainstorm
  async function handleReloadGptBrainstorm() {
    //show loading spinner
    setIsBrainstorming(true);

    //detch brainstorm
    getGptBrainstorm({roomId: roomRef.current.id}).then(
      brainstorm => {
        //on false, hide loading spinner and dosplay error
        if (!brainstorm) {
          console.warn('An error occurred requesting a GPT Brainstorm');
          setIsBrainstorming(false);
          setDisplayedGptBrainstorm('An error occurred. Try again');
          return;
        }

        //on success, add brainstorm to gpt history, display newest brainstorm and hide loading spinner
        const newHistory = [...roomRef.current.gptHistory, brainstorm];
        setRoom({
          ...roomRef.current,
          gptHistory: newHistory,
        });
        setIsBrainstorming(false);
        setDisplayedGptBrainstorm(brainstorm);
      },
      err => {
        console.warn('Following error occurred requesting a GPT Brainstorm: ', err);
        setIsBrainstorming(false);
        setDisplayedGptBrainstorm('An error occurred. Try again');
      },
    );
  }

  //handler for changing gpt history selection
  function handleChangeGptBrainstorm(event: React.FormEvent<HTMLSelectElement>) {
    setDisplayedGptBrainstorm(event.currentTarget.value);
  }

  //handler for switching to different timestamp
  function handleSetTimestamp(sections: Array<SectionType>) {
    setRoom({...room, sections});
  }

  //components

  //if room id is empty, show loading spinner
  return room.id !== '' ? (
    <>
      <RoomContent>
        <RoomHeader>
          <RowItemsSpacedHalf>
            <img src={ChevronBigIcon} onClick={handleGoBack} title='Go back' />
            <div>{room.name}</div>
          </RowItemsSpacedHalf>
          <div style={{fontSize: pxToRem(font.sizeSmall)}}>
            {filter === '' ? (
              <img src={EllipsisIconInactive} onClick={handleTimestampClick} />
            ) : (
              <img src={EllipsisIconActive} onClick={handleTimestampClick} />
            )}

            <Menu id={room.id}>
              <Submenu
                label='Timestamp'
                arrow={<img src={MenuArrowInactiveIcon} />}
                disabled={!room.isCreator}
              >
                <Item id='create' onClick={handleOnCreateTimestamp}>
                  Create Timestamp
                </Item>
                <Separator />
                <Item id='select' onClick={handleOnSelectTimeStamp}>
                  Select Timestamp
                </Item>
              </Submenu>
              <Separator />
              <Submenu
                label='Filter'
                arrow={
                  filter === '' ? (
                    <img src={MenuArrowInactiveIcon} />
                  ) : (
                    <img src={MenuArrowActiveIcon} />
                  )
                }
              >
                <KeywordInput
                  type={'text'}
                  id='filter'
                  onChange={handleChangeFilter}
                  value={filter}
                  placeholder={'Filter'}
                  onClick={event => event.stopPropagation()}
                />
              </Submenu>
            </Menu>
          </div>
        </RoomHeader>
        <SectionWrapper>
          {filteredRoom.sections.map((section, index) => (
            <SectionElement key={section.id}>
              <div>{section.name}</div>
              {section.cards
                ? section.cards.map(card => (
                    <Card
                      key={card.id}
                      card={card}
                      selfId={selfId}
                      sectionIndex={index}
                      onEditCard={handleEditCard}
                      onDeleteCard={handleDeleteCard}
                    />
                  ))
                : ''}
              <AddCard onAddCard={handleAddCard} sectionIndex={index} />
            </SectionElement>
          ))}
          <SectionElement>
            {!showSectionInput ? (
              <AddSectionPlusWrapper onClick={() => setShowSectionInput(true)} title='Add Section'>
                <img src={PlusIcon} />
              </AddSectionPlusWrapper>
            ) : (
              <RowItemsSpacedHalf>
                <KeywordInput
                  type={'text'}
                  id='section'
                  onChange={handleChangeSectionInput}
                  value={sectionInput}
                  placeholder={'Enter section name'}
                  onKeyDown={handleKeyDownSection}
                />
                {sectionInput === '' ? (
                  <img src={CloseIcon} onClick={() => setShowSectionInput(false)} />
                ) : (
                  <img src={CheckIcon} onClick={handleAddSection} />
                )}
              </RowItemsSpacedHalf>
            )}
          </SectionElement>
        </SectionWrapper>
      </RoomContent>
      <PaneSwitch active={showGptPane} onClick={handleTogglePane}>
        <img src={ChevronSmallIcon} />
      </PaneSwitch>
      <GptPane active={showGptPane}>
        {showGptPane ? (
          <ColumnItemsFlexSpaced style={{height: '100%'}}>
            <ColumnItemsFlexSpacedHalf>
              <RowItemsSpacedHalf>
                <div>ID</div>
                <SecondaryBadge title='Copy id to invite people'>{room.id}</SecondaryBadge>
              </RowItemsSpacedHalf>
              <div>Keywords</div>
              <KeywordWrapper>
                {room.keywords.map(keyword => (
                  <Badge key={keyword}>{keyword}</Badge>
                ))}
              </KeywordWrapper>
            </ColumnItemsFlexSpacedHalf>
            <PaneTextFieldWrapper>
              <RowItemsSpacedHalf>
                <div>GPT-Brainstorm</div>
                {isBrainstorming ? (
                  <LoadingSpinnerSmallest />
                ) : (
                  <img src={ReloadIcon} onClick={handleReloadGptBrainstorm} title='Reload' />
                )}
              </RowItemsSpacedHalf>

              <PaneTextFieldSelector
                id='historySelect'
                onChange={handleChangeGptBrainstorm}
                value={displayedGptBrainstorm}
              >
                {
                  //reverse the Array to display the newest ones on top
                  room.gptHistory
                    .slice(0)
                    .reverse()
                    .map((element, index) => (
                      <option key={index} value={element}>
                        {element.slice(0, 22) + '...'}
                      </option>
                    ))
                }
              </PaneTextFieldSelector>
              <PaneTextField>{displayedGptBrainstorm}</PaneTextField>
            </PaneTextFieldWrapper>
            <PaneTextFieldWrapper>
              <div>Ask GPT</div>
              <RowItems>
                <PromptInput
                  type={'text'}
                  id='keyword'
                  onChange={handleChangePromptInput}
                  value={gptPrompt}
                  placeholder={'Prompt'}
                  onKeyDown={handleKeyDownPrompt}
                />
                <PromptIconWrapper>
                  {isAnswering ? (
                    <LoadingSpinnerSmallest />
                  ) : (
                    <img
                      style={{cursor: 'pointer'}}
                      src={CheckIcon}
                      onClick={handleConfirmPrompt}
                    />
                  )}
                </PromptIconWrapper>
              </RowItems>
              <PaneTextField>{gptPrediction}</PaneTextField>
            </PaneTextFieldWrapper>
          </ColumnItemsFlexSpaced>
        ) : null}
      </GptPane>
      {showCreateTimestamp ? (
        <CreateTimestampPopup
          sections={room.sections}
          onClose={() => setShowCreateTimestamp(false)}
        />
      ) : null}
      {showSelectTimestamp && eventHandler.current !== undefined ? (
        <SelectTimestampPopup
          onClose={() => setShowSelectTimestamp(false)}
          onSetTimestamp={handleSetTimestamp}
          eventHandler={eventHandler.current}
        />
      ) : null}
    </>
  ) : (
    <LoadingSpinnerWrapper style={{color: color.blue}}>
      <LoadingSpinner />
    </LoadingSpinnerWrapper>
  );
}
