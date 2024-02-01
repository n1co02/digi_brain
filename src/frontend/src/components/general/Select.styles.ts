//Author: Nico Mangold
import styled from 'styled-components';
import {color} from '../../constants/style/appTheme';
import {font} from '../../constants/style/font';
import {pxToRem} from '../../utilities/metric';

//own select style

export const Select = styled.select`
  color: ${color.blue};
  border: 0;
  border-bottom: 1px solid ${color.grey};
  font-size: ${pxToRem(font.sizeSmaller)};

  cursor: pointer;

  outline: 0;
`;
