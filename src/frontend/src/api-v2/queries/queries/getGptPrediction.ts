//Author: Erik Priemer + Nico Mangold
import apiFetch from '../../../api-v2/apiFetch';
import {GetGptPredictionDocument} from '../../../gql/graphql';
import {getGatewayServiceUrl} from '../../../api-v2/api';

type Params = {
  prompt: string;
};

export default async function getGptPrediction({prompt}: Params) {
  const result = await apiFetch(getGatewayServiceUrl(), GetGptPredictionDocument, {
    prompt,
  });
  return result.getGptPrediction;
}
