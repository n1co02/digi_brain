//Author: Nico Mangold
import styled from 'styled-components';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {metric} from '../constants/style/metric';
import {pxToRem} from '../utilities/metric';

export const AddCardWrapper = styled.div`
  width: 100%;
  padding: ${pxToRem(metric.textboxPadding)};

  border: 3px solid ${color.blue};
  border-radius: ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeSmall)};

  background-color: ${color.backgroundDefault};
`;

export const AddCardPlusWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: ${pxToRem(metric.textboxPadding)};

  align-items: center;
  justify-content: center;

  border-radius: ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeSmall)};

  background-color: ${color.backgroundBlue};

  cursor: pointer;
`;

type AddCardColorElementProps = {
  active: boolean;
  color: string;
};
export const AddCardColorElement = styled.div<AddCardColorElementProps>`
  width: ${pxToRem(metric.colorElementSize)};
  height: ${pxToRem(metric.colorElementSize)};

  border: ${p => (p.active ? `1px solid ${color.blue}` : 0)};
  border-radius: 50%;

  background-color: ${p => p.color};

  cursor: pointer;
`;
