//Author: Nico Mangold
import styled from 'styled-components';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {metric} from '../constants/style/metric';
import {pxToRem} from '../utilities/metric';

export const PopupWrapper = styled.div`
  display: flex;

  position: absolute;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.5);

  img {
    cursor: pointer;
  }
`;

export const PopupElement = styled.div`
  display: flex;

  padding: ${pxToRem(metric.defaultPadding)};

  color: ${color.blue};
  background-color: ${color.backgroundDefault};

  font-size: ${pxToRem(font.sizeBigger)};

  border-radius: ${pxToRem(metric.borderRadius)};
`;

export const PopupCloseButton = styled.div`
  display: flex;
  position: absolute;
  cursor: pointer;
`;
