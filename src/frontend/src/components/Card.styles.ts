//Author: Nico Mangold
import styled from 'styled-components';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {metric} from '../constants/style/metric';
import {pxToRem} from '../utilities/metric';

type CardWrapperProps = {
  color: string;
};
export const CardWrapper = styled.div<CardWrapperProps>`
  width: 100%;
  min-height: ${pxToRem(metric.cardMinHeight)};
  padding: ${pxToRem(metric.textboxPadding)};

  border-radius: ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeSmall)};

  background-color: ${p => p.color};

  overflow: auto;
`;
export const CardHeader = styled.div`
  width: 100%;

  font-size: ${pxToRem(font.sizeNormal)};
`;

export const CardInputArea = styled.textarea`
  width: 100%;
  height: ${pxToRem(metric.textareaHeight)};

  border-radius: ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeSmall)};
  font-family: ${font.family};
  font-style: italic;

  color: ${color.blue};
  resize: none;
`;
