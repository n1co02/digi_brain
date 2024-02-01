//Author: Erik Priemer + Nico Mangold + Nicolas Ostermann
import {getGatewayServiceLoginUrl} from '../../api';

type Params = {
  userName: string;
  password: string;
};
type RegistrationResponse = {
  userId: string | null;
};

export default async function login({userName, password}: Params): Promise<string | null> {
  try {
    const response = await fetch(getGatewayServiceLoginUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({userName, password}),
    });
    const result = (await response.json()) as RegistrationResponse;
    return result.userId;
  } catch (err) {
    console.error('failed to register:', err);
  }
  return null;
}
