//Author: Nico Mangold

//Provides style for all childs of App
import styled from 'styled-components';
import {color} from './constants/style/appTheme';

export const AppContent = styled.div`
  display: flex;
  height: 100%;

  background: ${color.backgroundDefault};

  --contexify-item-color: ${color.blue};

  *::-webkit-scrollbar {
    width: 10px;
    height: 10px;

    background-color: transparent;
  }
  *::-webkit-scrollbar-button {
    width: 5px;
    height: 10px;
    background-color: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background-color: ${color.greyLight};

    &:hover {
      background-color: ${color.grey};
    }

    border-radius: 5px;
  }
`;
