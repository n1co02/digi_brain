//Author: Nico Mangold
import styled from 'styled-components';
import {metric} from '../../constants/style/metric';
import {pxToRem} from '../../utilities/metric';

//reusable Layout styles

export const ColumnItems = styled.div`
  display: flex;

  flex-direction: column;
`;

export const ColumnItemsFlex = styled(ColumnItems)`
  width: 100%;
`;
export const ColumnItemsFlexSpacedHalf = styled(ColumnItemsFlex)`
  > *:not(:last-child) {
    margin-bottom: ${pxToRem(metric.defaultSpace / 2)};
  }
`;
export const ColumnItemsFlexSpaced = styled(ColumnItemsFlex)`
  > *:not(:last-child) {
    margin-bottom: ${pxToRem(metric.defaultSpace)};
  }
`;

export const ColumnItemsCenter = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;

export const ColumnItemsCenterFlex = styled(ColumnItemsCenter)`
  width: 100%;
`;

export const ColumnItemsCenterSpaced = styled(ColumnItemsCenter)`
  > *:not(:last-child) {
    margin-bottom: ${pxToRem(metric.defaultSpace)};
  }
`;
export const ColumnItemsCenterSpacedHalf = styled(ColumnItemsCenter)`
  > *:not(:last-child) {
    margin-bottom: ${pxToRem(metric.defaultSpace)};
  }
`;

export const ColumnItemsCenterSpacedFlex = styled(ColumnItemsCenterSpaced)`
  width: 100%;
`;

export const ColumnItemsCenterSpacedBig = styled(ColumnItemsCenter)`
  > *:not(:last-child) {
    margin-bottom: ${pxToRem(metric.defaultSpaceBig)};
  }
`;

export const ColumnItemsCenterFillSpaceBetween = styled.div`
  display: flex;
  height: 100%;

  flex-direction: column;
  align-items: center;

  justify-content: space-between;
`;

export const RowItems = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
`;
export const RowItemsEnd = styled(RowItems)`
  justify-content: flex-end;
`;

export const RowItemsFlex = styled(RowItems)`
  height: 100%;
`;

export const RowItemsSpaced = styled(RowItems)`
  > *:not(:last-child) {
    margin-right: ${pxToRem(metric.defaultSpace)};
  }
`;
export const RowItemsSpacedHalf = styled(RowItems)`
  > *:not(:last-child) {
    margin-right: ${pxToRem(metric.defaultSpace / 2)};
  }
`;
export const RowItemsSpacedHalfEnd = styled(RowItemsSpacedHalf)`
  justify-content: flex-end;
`;

export const RowItemsFillSpaceBetween = styled(RowItems)`
  justify-content: space-between;
`;

export const ItemElasticScroll = styled.div`
  width: 100%;
  height: 100%;

  flex-shrink: 1;

  overflow-x: hidden;
  overflow-y: auto;
`;
