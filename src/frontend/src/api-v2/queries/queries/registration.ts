//Author: Erik Priemer + Nico Mangold + Nicolas Ostermann
import {getGatewayServiceRegistrationUrl} from '../../api';

type Params = {
  userName: string;
  password: string;
};
type RegistrationResponse = {
  userId: string | null;
};

export default async function registration({userName, password}: Params): Promise<string | null> {
  try {
    const response = await fetch(getGatewayServiceRegistrationUrl(), {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({userName, password}),
    });
    const result = (await response.json()) as RegistrationResponse;
    return result.userId; // parses JSON response into native JavaScript objects
  } catch (err) {
    console.error('failed to register:', err);
  }
  return null;
}
