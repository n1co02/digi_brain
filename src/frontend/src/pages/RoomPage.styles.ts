//Author: Nico Mangold
import styled from 'styled-components';
import {metric} from '../constants/style/metric';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import {
  ColumnItemsCenterSpacedHalf,
  ColumnItemsFlex,
  ColumnItemsFlexSpaced,
  ItemElasticScroll,
  RowItemsFillSpaceBetween,
  RowItemsFlex,
  RowItemsSpacedHalf,
} from '../components/general/Layout.styles';
import {Badge, SecondaryBadge} from '../components/Badge.styles';
import {pxToRem} from '../utilities/metric';

export const RoomContent = styled(ColumnItemsFlexSpaced)`
  height: 100%;
  min-width: 0;

  padding-top: ${pxToRem(metric.defaultPadding)};

  font-size: ${pxToRem(font.sizeBigger)};
  font-weight: ${font.bold};
  color: ${color.blue};

  img {
    cursor: pointer;
  }
`;

type GptPaneProps = {
  active: boolean;
};
export const GptPane = styled.div<GptPaneProps>`
  height: 100%;
  width: ${p => (p.active ? pxToRem(metric.gptPaneWidth) : pxToRem(0))};
  padding: ${pxToRem(metric.defaultPadding)} ${pxToRem(metric.defaultPadding)};
  flex-shrink: 0;

  border-left: 1px solid ${color.grey};

  background-color: ${color.backgroundBlue};
  color: ${color.blue};

  font-size: ${pxToRem(font.sizeNormal)};

  overflow: overlay;

  img {
    cursor: pointer;
  }
`;
export const PaneSwitch = styled.div<GptPaneProps>`
  display: flex;
  position: absolute;
  top: 50%;
  right: ${p =>
    p.active
      ? pxToRem(metric.gptPaneWidth - metric.switchWidth / 2)
      : pxToRem(metric.defaultPadding * 2 - metric.switchWidth / 2)};
  height: ${pxToRem(metric.switchHeight)};
  width: ${pxToRem(metric.switchWidth)};

  align-items: center;
  justify-content: center;

  border: 1px solid ${color.grey};
  border-radius: ${pxToRem(metric.borderRadius / 2)};

  background-color: ${color.backgroundDefault};

  cursor: pointer;

  img {
    transform: ${p => (p.active ? 'rotate(0)' : 'rotate(180deg)')};
  }
`;
export const PaneTextFieldWrapper = styled(ColumnItemsFlex)`
  height: 37.5%;
`;
export const PaneTextField = styled.div`
  width: 100%;
  height: 100%;
  min-height: ${pxToRem(75)};
  padding: ${pxToRem(metric.textboxPadding)};

  border-top: 1px solid ${color.grey};
  border-radius: 0 0 ${pxToRem(metric.borderRadius)} ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeSmall)};

  overflow: auto;

  background-color: ${color.backgroundDefault};
`;

export const PaneTextFieldSelector = styled.select`
  width: 100%;
  height: ${pxToRem(metric.promptInputHeight)};

  padding: 0 ${pxToRem(metric.textboxPadding)};
  margin-top: ${pxToRem(metric.defaultSpace / 2)};

  flex-shrink: 0;

  border: 0;
  border-radius: ${pxToRem(metric.borderRadius)} ${pxToRem(metric.borderRadius)} 0 0;

  font-size: ${pxToRem(font.sizeSmall)};

  color: ${color.blue};
  background-color: ${color.backgroundDefault};

  cursor: pointer;

  outline: 0;
`;

export const PromptInput = styled.input`
  position: relative;

  width: 100%;
  height: ${pxToRem(metric.promptInputHeight)};

  padding: ${pxToRem(metric.textboxPadding)};
  margin-top: ${pxToRem(metric.defaultSpace / 2)};

  font-size: ${pxToRem(font.sizeSmaller)};
  font-style: italic;

  color: ${color.blue};

  border: 0;
  border-radius: ${pxToRem(metric.borderRadius)} 0 0 0;
  outline: 0;
`;
export const PromptIconWrapper = styled.div`
  display: flex;
  position: relative;

  height: ${pxToRem(metric.promptInputHeight)};

  padding-right: ${pxToRem(metric.textboxPadding)};
  margin-top: ${pxToRem(metric.defaultSpace / 2)};

  justify-content: center;
  align-items: center;

  color: ${color.blue};
  background-color: ${color.backgroundDefault};

  border: 0;
  border-radius: 0 ${pxToRem(metric.borderRadius)} 0 0;
`;

export const RoomHeader = styled(RowItemsFillSpaceBetween)`
  padding: 0 ${pxToRem(metric.defaultPadding)};
`;

export const SectionWrapper = styled(RowItemsFlex)`
  padding-left: ${pxToRem(metric.defaultPadding)};
  padding-bottom: ${pxToRem(metric.defaultPadding)};

  overflow: auto;
  > *:not(:last-child) {
    border-right: 1px solid ${color.grey};
  }
`;

export const SectionElement = styled(ColumnItemsCenterSpacedHalf)`
  width: ${pxToRem(metric.sectionWidth)};
  height: 100%;
  padding: 0 ${pxToRem(metric.defaultPadding)};

  flex-shrink: 0;

  font-size: ${pxToRem(font.sizeNormal)};

  background-color: ${color.backgroundDefault};

  overflow: auto;
`;

export const AddSectionPlusWrapper = styled.div`
  display: flex;
  width: 70%;
  padding: ${pxToRem(metric.textboxPadding)};

  align-items: center;
  justify-content: center;

  border: 3px solid ${color.blue};
  border-radius: ${pxToRem(metric.borderRadius)};

  font-size: ${pxToRem(font.sizeNormal)};

  cursor: pointer;
`;

export const HistoryScroll = styled(ItemElasticScroll)`
  width: 100%;
  max-height: ${pxToRem(metric.historyListHeight)};

  border: 2px solid ${color.grey};
  border-right: 0;
  border-left: 0;

  font-size: ${pxToRem(font.sizeSmaller)};
`;

type HistoryRoomElementProps = {
  active: boolean;
};
export const HistoryRoomElement = styled(RowItemsFillSpaceBetween)<HistoryRoomElementProps>`
  padding: ${pxToRem(metric.historyListPadding)} 1px;

  cursor: pointer;

  border: ${p => (p.active ? `1px solid ${color.blue}` : '0')};
  border-radius ${pxToRem(metric.borderRadius / 2)};

  background-color: ${p => (p.active ? color.backgroundBlue : '0')};

  ${Badge} {
    font-size: ${pxToRem(font.sizeSmall)};
  }

  &:hover {
    background-color: ${color.backgroundBlue};
  }
`;

export const KeywordWrapper = styled(RowItemsSpacedHalf)`
  flex-wrap: wrap;

  ${Badge} {
    margin-bottom: ${pxToRem(metric.defaultSpace / 2)};
  }
  ${SecondaryBadge} {
    margin-bottom: ${pxToRem(metric.defaultSpace / 2)};
  }
`;
