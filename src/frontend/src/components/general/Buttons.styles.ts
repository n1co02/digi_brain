//Author: Nico Mangold
import styled from 'styled-components';
import {metric} from '../../constants/style/metric';
import {color} from '../../constants/style/appTheme';
import {font} from '../../constants/style/font';
import {pxToRem} from '../../utilities/metric';

///General Button styles

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${pxToRem(metric.iconInputHeight)};
  width: 100%;

  border: 0;
  border-radius: ${pxToRem(metric.iconInputHeight / 2)};
  background-color: ${color.blue};

  font-size: ${pxToRem(font.sizeNormal)};
  color: ${color.backgroundDefault};

  &:not(:disabled) {
    cursor: pointer;

    &:hover {
      background-color: ${color.blueHover};
    }
    &:active {
      background-color: ${color.blueActive};
    }
  }
  &:disabled {
    opacity: 0.5;
  }
`;
export const ButtonSecondary = styled(Button)`
  color: ${color.blue};
  background-color: ${color.backgroundDefault};

  border: 1px solid ${color.blue};

  &:not(:disabled) {
    &:hover {
      background-color: ${color.backgroundBlue};
    }
  }
`;

export const IconButton = styled(Button)`
  height: ${pxToRem(metric.iconButtonHeight)};
`;

export const ButtonSmaller = styled(Button)`
  height: ${pxToRem(metric.iconInputHeight / 2)};
`;
export const ButtonSmallerSecondary = styled(ButtonSecondary)`
  height: ${pxToRem(metric.iconInputHeight / 2)};
`;

export const ButtonSmall = styled(Button)`
  height: ${pxToRem(metric.iconButtonHeight / 2)};
  font-size: ${pxToRem(font.sizeSmall)};
`;
export const ButtonSmallSecondary = styled(ButtonSecondary)`
  height: ${pxToRem(metric.iconButtonHeight / 2)};
  font-size: ${pxToRem(font.sizeSmall)};
`;
