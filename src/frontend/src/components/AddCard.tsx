//Author: Nico Mangold
import React, {useState} from 'react';
import {CardInputArea} from './Card.styles';
import {
  ColumnItemsFlexSpacedHalf,
  RowItemsFillSpaceBetween,
  RowItemsSpacedHalf,
} from './general/Layout.styles';
import {KeywordInput} from '../pages/RoomListPage.styles';
import PlusIcon from '../icons/plusBig.svg';
import CheckIcon from '../icons/checkGrey.svg';
import {AddCardColorElement, AddCardPlusWrapper, AddCardWrapper} from './AddCard.styles';
import {Badge} from './Badge.styles';
import {ButtonSmall, ButtonSmallSecondary} from './general/Buttons.styles';

type AddCardProps = {
  sectionIndex: number;
  onAddCard: (
    header: string,
    text: string,
    color: string,
    labels: Array<string>,
    sectionIndex: number,
  ) => void;
};

export const COLORS = ['#B6E0F7', '#F7B6B6', '#F7E1B6', '#F5F7B6', '#BAF7B6', '#CCB6F7', '#F7B6F2'];

//Element to add card
export function AddCard({sectionIndex, onAddCard: handleAddCard}: AddCardProps): JSX.Element {
  const [active, setActive] = useState(false);
  const [cardHeaderInput, setCardHeaderInput] = useState('');
  const [cardTextInput, setCardTextInput] = useState('');

  const [labels, setLabels] = useState<Array<string>>([]);
  const [labelInput, setLabelInput] = useState('');

  const [selectedColor, setSelectedColor] = useState(0);

  function handleToggleActive() {
    setActive(!active);
  }

  function handleChangeCardHeaderInput(event: React.FormEvent<HTMLInputElement>): void {
    setCardHeaderInput(event.currentTarget.value);
  }
  function handleChangeCardTextInput(event: React.FormEvent<HTMLTextAreaElement>): void {
    setCardTextInput(event.currentTarget.value);
  }
  function handleOnAddCard(): void {
    if (cardHeaderInput !== '' && cardTextInput !== '') {
      handleAddCard(cardHeaderInput, cardTextInput, COLORS[selectedColor], labels, sectionIndex);
      handleResetCard();
    }
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

  function handleResetCard() {
    setCardHeaderInput('');
    setCardTextInput('');
    setLabelInput('');
    setLabels([]);
    setActive(false);
  }

  return active ? (
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
        <ColumnItemsFlexSpacedHalf>
          {labels.map(label => (
            <Badge key={label}>{label}</Badge>
          ))}
        </ColumnItemsFlexSpacedHalf>
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
          <ButtonSmallSecondary onClick={handleResetCard}>CANCEL</ButtonSmallSecondary>
          <ButtonSmall
            disabled={cardHeaderInput === '' || cardTextInput === ''}
            onClick={handleOnAddCard}
          >
            ADD
          </ButtonSmall>
        </RowItemsSpacedHalf>
      </ColumnItemsFlexSpacedHalf>
    </AddCardWrapper>
  ) : (
    <AddCardPlusWrapper onClick={handleToggleActive} title='Add Card'>
      <img src={PlusIcon} />
    </AddCardPlusWrapper>
  );
}
