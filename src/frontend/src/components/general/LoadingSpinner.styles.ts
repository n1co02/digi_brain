//Author: Nico Mangold
import styled, {keyframes} from 'styled-components';
import {metric} from '../../constants/style/metric';
import {pxToRem} from '../../utilities/metric';

///styles for loading spinner

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinnerWrapper = styled.div`
  display: flex;

  height: 100%;
  width: 100%;

  justify-content: center;
`;

export const LoadingSpinner = styled.div`
  height: ${pxToRem(metric.loadingSpinnerSize)};
  width: ${pxToRem(metric.loadingSpinnerSize)};

  border: ${pxToRem(metric.loadingSpinnerStrength)} solid;
  border-left: ${pxToRem(metric.loadingSpinnerStrength)} solid transparent;
  border-radius: 50%;

  align-self: center;

  animation: ${rotate360} 1s linear infinite;
`;

export const LoadingSpinnerSmall = styled(LoadingSpinner)`
  height: ${pxToRem(metric.loadingSpinnerSize / 2)};
  width: ${pxToRem(metric.loadingSpinnerSize / 2)};

  border: ${pxToRem(metric.loadingSpinnerStrength / 2)} solid;
  border-left: ${pxToRem(metric.loadingSpinnerStrength / 2)} solid transparent;
`;

export const LoadingSpinnerSmallest = styled(LoadingSpinner)`
  height: ${pxToRem(metric.loadingSpinnerSize / 3)};
  width: ${pxToRem(metric.loadingSpinnerSize / 3)};

  border: ${pxToRem(metric.loadingSpinnerStrength / 3)} solid;
  border-left: ${pxToRem(metric.loadingSpinnerStrength / 3)} solid transparent;
`;
