/* eslint-disable max-len */
import * as SecureStore from 'expo-secure-store';
import Bugsnag from '@bugsnag/expo';

/**
 * Retrieves an access token for authentication.
 * If a valid token is stored in the device's secure storage and has not expired, it is returned.
 * Otherwise, a new access token is fetched from the server using the provided credentials.
 * The fetched access token is then stored in the secure storage along with its expiration time.
 *
 * @returns {Promise<string>} A promise that resolves to an access token.
 */
export async function getToken() {
  const tokenExpiration = await SecureStore.getItemAsync('token_expiration');
  if (tokenExpiration && Date.now() < JSON.parse(tokenExpiration)) {
    const accessToken = await SecureStore.getItemAsync('access_token');
    return accessToken;
  }
  Bugsnag.leaveBreadcrumb(`Fetching new access token, body: ${`grant_type=${process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE}&client_id=${process.env.EXPO_PUBLIC_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_CLIENT_SECRET}`}`);
  const res = await fetch('https://brewerdigital-apiprize.canvasmedical.com/auth/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=${process.env.EXPO_PUBLIC_AUTH_GRANT_TYPE}&client_id=${process.env.EXPO_PUBLIC_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_CLIENT_SECRET}`,
  });
  Bugsnag.leaveBreadcrumb(`After fetch for new access token, res: ${res}`);
  const json = await res.json();
  await SecureStore.setItemAsync('access_token', json.access_token);
  await SecureStore.setItemAsync('token_expiration', JSON.stringify(Date.now() + json.expires_in - 1000));
  return json.access_token;
}
