//Author: Nico Mangold
import styled from 'styled-components';
import {font} from '../constants/style/font';
import {color} from '../constants/style/appTheme';
import {metric} from '../constants/style/metric';
import {pxToRem} from '../utilities/metric';

//different badge styles

export const Badge = styled.div`
  height: fit-content;
  width: fit-content;
  padding: 1px ${pxToRem(5)};

  color: ${color.backgroundDefault};
  font-size: ${pxToRem(font.sizeSmaller)};

  border-radius: ${pxToRem(metric.borderRadius / 2)};
  background-color: ${color.blue};
`;

export const SecondaryBadge = styled(Badge)`
  color: ${color.blue};

  border: 1px solid ${color.blue};

  background-color: transparent;
`;
