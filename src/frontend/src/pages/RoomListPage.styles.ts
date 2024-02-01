//Author: Nico Mangold
import styled from 'styled-components';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {ColumnItemsCenter, ItemElasticScroll} from '../components/general/Layout.styles';
import {metric} from '../constants/style/metric';
import {pxToRem} from '../utilities/metric';

export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  justify-content: center;

  padding: ${pxToRem(metric.defaultPadding)};

  font-size: ${pxToRem(font.sizeBiggest)};
  color: ${color.blue};
`;

export const RoomScroll = styled(ItemElasticScroll)`
  width: 100%;

  border: 2px solid ${color.grey};
  border-right: 0;
  border-left: 0;
`;

export const RoomElement = styled.div`
  display: flex;
  width: 100%;

  margin: ${pxToRem(metric.defaultPadding)} 0;
  padding: ${pxToRem(metric.roomElementPadding)};
  padding-top: 0;

  justify-content: center;

  border: 1px solid ${color.grey};
  border-radius: ${pxToRem(metric.borderRadius)};

  background-color: ${color.backgroundBlue};

  font-size: ${pxToRem(font.sizeBigger)};

  cursor: pointer;
`;

export const RoomElementIcons = styled(ColumnItemsCenter)`
  justify-content: space-between;
  padding-top: ${pxToRem(metric.roomElementPadding)};
  margin-left: ${pxToRem(metric.roomElementPadding)};
`;

export const KeywordInput = styled.input`
  position: relative;

  width: 100%;

  font-size: ${pxToRem(font.sizeSmaller)};
  font-style: italic;

  color: ${color.blue};

  border: 0;
  border-bottom: 1px solid ${color.grey};
  outline: 0;
`;

export const LogoutWrapper = styled.div`
  position: absolute;
  top: ${pxToRem(metric.defaultPadding)};
  right: ${pxToRem(metric.defaultPadding)};

  cursor: pointer;
`;
