//Author: Erik Priemer + Nico Mangold
import {getGatewayServiceIsAuthenticatedUrl} from '../../api';

type RegistrationResponse = {
  userId: string | null;
};

export default async function isAuthenticated(): Promise<string | null> {
  try {
    const response = await fetch(getGatewayServiceIsAuthenticatedUrl(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = (await response.json()) as RegistrationResponse;
    return result.userId;
  } catch (err) {
    console.error('failed to register:', err);
  }
  return null;
}
