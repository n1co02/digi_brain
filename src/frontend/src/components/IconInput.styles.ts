//Author: Nico Mangold
import styled from 'styled-components';
import {metric} from '../constants/style/metric';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {pxToRem} from '../utilities/metric';

export const IconInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${pxToRem(metric.iconInputHeight)};

  border: 1px solid;
  border-radius: ${pxToRem(metric.iconInputHeight / 2)};
  color: ${color.grey};
  background-color: ${color.backgroundDefault};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${pxToRem(metric.iconInputHeight)};
  height: ${pxToRem(metric.iconInputHeight)};
`;

export const Input = styled.input`
  position: relative;
  top: ${pxToRem(3)};

  width: 100%;
  margin-right: ${pxToRem(metric.defaultPadding)};

  font-size: ${pxToRem(font.sizeNormal)};
  font-style: italic;

  color: ${color.blue};

  border: 0;
  outline: 0;
`;
