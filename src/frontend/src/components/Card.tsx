//Author: Nico Mangold
import React from 'react';
import {useState} from 'react';
import {CardHeader, CardInputArea, CardWrapper} from './Card.styles';
import {useContextMenu, Menu, Item, Separator} from 'react-contexify';
import {KeywordInput} from '../pages/RoomListPage.styles';
import {Badge, SecondaryBadge} from './Badge.styles';
import {
  RowItemsFillSpaceBetween,
  ColumnItemsFlexSpacedHalf,
  RowItemsSpacedHalf,
} from './general/Layout.styles';
import EllipsisIcon from '../icons/ellipsis.svg';
import {AddCardColorElement, AddCardWrapper} from './AddCard.styles';
import {ButtonSmall, ButtonSmallSecondary} from './general/Buttons.styles';
import CheckIcon from '../icons/checkGrey.svg';
import {COLORS} from './AddCard';
import {KeywordWrapper} from '../pages/RoomPage.styles';

export type CardType = {
  id: string;
  userId: string;
  userName: string;
  headline: string;
  text: string;
  color: string;
  labels: Array<string>;
};

//normal card displayed in room
type StaticCardProps = {
  card: CardType;
  selfId: string;
  onEdit: () => void;
  onDelete: () => void;
};
function StaticCard({
  card,
  selfId,
  onEdit: handleOnEdit,
  onDelete: handleOnDelete,
}: StaticCardProps): JSX.Element {
  const {show} = useContextMenu({id: card.id});
  let username = card.userName;
  if (card.userId === selfId) {
    username = 'You';
  }

  function handleBurgerClick(event: React.MouseEvent<HTMLImageElement>) {
    show({event});
  }

  return (
    <CardWrapper color={card.color}>
      <ColumnItemsFlexSpacedHalf>
        <RowItemsFillSpaceBetween>
          <Badge>{username}</Badge>
          {card.id.startsWith('temp') || card.userId !== selfId ? null : (
            <img src={EllipsisIcon} onClick={handleBurgerClick} />
          )}

          <Menu id={card.id}>
            <Item id='delete' onClick={handleOnDelete}>
              Delete
            </Item>
            <Separator />
            <Item id='edit' onClick={handleOnEdit}>
              Edit
            </Item>
          </Menu>
        </RowItemsFillSpaceBetween>
        <KeywordWrapper>
          {card.labels.map((label, index) => (
            <SecondaryBadge key={index} color={card.color}>
              {label}
            </SecondaryBadge>
          ))}
        </KeywordWrapper>
      </ColumnItemsFlexSpacedHalf>
      <CardHeader>{card.headline}</CardHeader>
      <div>{card.text}</div>
    </CardWrapper>
  );
}

//card displayed when editing existing card
type EditCardProps = {
  headline: string;
  text: string;
  color: string;
  existingLabels: Array<string>;
  onSubmitChanges: (header?: string, text?: string, color?: string, labels?: Array<string>) => void;
  onCancelChanges: () => void;
};
function EditCard({
  headline,
  text,
  color,
  existingLabels,
  onSubmitChanges: handleSubmitChanges,
  onCancelChanges: handleCancelChanges,
}: EditCardProps): JSX.Element {
  const [cardHeaderInput, setCardHeaderInput] = useState(headline);
  const [cardTextInput, setCardTextInput] = useState(text);

  const [labels, setLabels] = useState<Array<string>>([...existingLabels]);
  const [labelInput, setLabelInput] = useState('');

  const [selectedColor, setSelectedColor] = useState(COLORS.indexOf(color));

  function handleChangeCardHeaderInput(event: React.FormEvent<HTMLInputElement>): void {
    setCardHeaderInput(event.currentTarget.value);
  }
  function handleChangeCardTextInput(event: React.FormEvent<HTMLTextAreaElement>): void {
    setCardTextInput(event.currentTarget.value);
  }
  function handleOnSubmit(): void {
    handleSubmitChanges(
      cardHeaderInput !== headline ? cardHeaderInput : undefined,
      cardTextInput !== text ? cardTextInput : undefined,
      color !== COLORS[selectedColor] ? COLORS[selectedColor] : undefined,
      labels !== existingLabels ? labels : undefined,
    );
  }

  function handleChangeLabelInput(event: React.FormEvent<HTMLInputElement>): void {
    setLabelInput(event.currentTarget.value);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleConfirmLabel();
    }
  }
  function handleConfirmLabel(): void {
    if (labelInput !== '' && !labels.includes(labelInput)) {
      const tempArray = labels;
      tempArray.push(labelInput);
      setLabels(tempArray);
      setLabelInput('');
    }
  }

  return (
    <AddCardWrapper>
      <ColumnItemsFlexSpacedHalf>
        <KeywordInput
          type={'text'}
          id='cardHeader'
          onChange={handleChangeCardHeaderInput}
          value={cardHeaderInput}
          placeholder={'Enter header'}
        />
        <CardInputArea
          placeholder='Enter text'
          value={cardTextInput}
          onChange={handleChangeCardTextInput}
        />
        <RowItemsSpacedHalf>
          <KeywordInput
            type={'text'}
            id='label'
            onChange={handleChangeLabelInput}
            value={labelInput}
            placeholder={'Enter label'}
            onKeyDown={handleKeyDown}
          />
          <img src={CheckIcon} onClick={handleConfirmLabel} />
        </RowItemsSpacedHalf>
        <KeywordWrapper>
          {labels.map(label => (
            <Badge key={label}>{label}</Badge>
          ))}
        </KeywordWrapper>
        <RowItemsFillSpaceBetween>
          {COLORS.map((color, index) => (
            <AddCardColorElement
              key={index}
              active={index === selectedColor}
              color={color}
              onClick={() => setSelectedColor(index)}
            />
          ))}
        </RowItemsFillSpaceBetween>
        <RowItemsSpacedHalf>
          <ButtonSmallSecondary onClick={handleCancelChanges}>CANCEL</ButtonSmallSecondary>
          <ButtonSmall onClick={handleOnSubmit}>SUBMIT</ButtonSmall>
        </RowItemsSpacedHalf>
      </ColumnItemsFlexSpacedHalf>
    </AddCardWrapper>
  );
}

type CardProps = {
  card: CardType;
  selfId: string;
  sectionIndex: number;
  onEditCard: (
    id: string,
    sectionIndex: number,
    header?: string,
    text?: string,
    color?: string,
    labels?: Array<string>,
  ) => void;
  onDeleteCard: (id: string, sectionIndex: number) => void;
};
export function Card({
  card,
  selfId,
  sectionIndex,
  onEditCard: handleEditCard,
  onDeleteCard: handleDeleteCard,
}: CardProps): JSX.Element {
  const [editable, setEditable] = useState(false);

  function handleOnEdit() {
    setEditable(true);
  }
  function handleOnDelete() {
    handleDeleteCard(card.id, sectionIndex);
  }
  function handleSubmitChanges(
    header?: string,
    text?: string,
    color?: string,
    labels?: Array<string>,
  ) {
    //gql
    handleEditCard(card.id, sectionIndex, header, text, color, labels);
    setEditable(false);
  }
  function handleCancelChanges() {
    setEditable(false);
  }
  return !editable ? (
    <StaticCard card={card} selfId={selfId} onEdit={handleOnEdit} onDelete={handleOnDelete} />
  ) : (
    <EditCard
      headline={card.headline}
      text={card.text}
      color={card.color}
      existingLabels={card.labels}
      onSubmitChanges={handleSubmitChanges}
      onCancelChanges={handleCancelChanges}
    />
  );
}
