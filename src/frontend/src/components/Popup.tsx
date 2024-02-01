//Author: Nico Mangold
import {PopupWrapper, PopupElement, PopupCloseButton} from './Popup.styles';
import React from 'react';
import CloseIcon from '../icons/cross.svg';

//'Popup boilerplate' that other pupups use as base
type PopupProps = {
  onClose: () => void;
  children: React.ReactNode;
};
export function Popup({onClose: handleClose, children}: PopupProps): JSX.Element {
  function handleStopPropagation(event: React.FormEvent<HTMLDivElement>): void {
    event.stopPropagation();
  }

  return (
    <PopupWrapper onClick={handleClose}>
      <PopupElement onClick={handleStopPropagation}>
        <PopupCloseButton onClick={handleClose}>
          <img src={CloseIcon} />
        </PopupCloseButton>
        {children}
      </PopupElement>
    </PopupWrapper>
  );
}
