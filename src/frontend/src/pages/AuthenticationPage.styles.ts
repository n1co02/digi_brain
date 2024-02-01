//Author: Nico Mangold
import styled from 'styled-components';
import {metric} from '../constants/style/metric';
import {color} from '../constants/style/appTheme';
import {font} from '../constants/style/font';
import Background from '../images/background.svg';
import {pxToRem} from '../utilities/metric';

export const Wrapper = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  justify-content: flex-end;
`;

export const ImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-image: url(${Background});
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: right;
`;

export const AuthenticationPane = styled.div`
  z-index: 1;
  width: ${pxToRem(metric.authenticationPaneWidth)};
  padding: ${pxToRem(metric.authenticationPanePadding)};
`;

export const H2 = styled.div`
  font-size: ${pxToRem(font.sizeBiggest)};
  color: ${color.blue};
`;
export const H1 = styled.div`
  font-size: ${pxToRem(70)};
  color: ${color.blue};
`;

export const Footer = styled.div`
  display: flex;
  color: ${color.grey};
`;

export const ErrorMessage = styled.div`
  color: ${color.error};

  font-size: ${pxToRem(font.sizeSmaller)};
`;
