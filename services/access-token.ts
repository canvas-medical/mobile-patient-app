/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

async function fetchAccessToken() {
  const res = await fetch('https://brewerdigital-apiprize.canvasmedical.com/auth/token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials&client_id=ymoBc5BYrV5ZrfDcCxd8WYnkZHV541HHNYZ8ALZH&client_secret=tqZCwP03LtAFx1nYK0unFhorTHS2wiIjPRmgGWnaKpKdNlRco6sZEjeDbp8xuCk4nAn93AYgD3Mbi6K3EQfcw0apTnz9UGN6yka4iu4V620xSHgD0WOgr6VXDb5pPhXk',
  });
  const json = await res.json();
  await SecureStore.setItemAsync('client_token', json.access_token);
  return json.access_token;
}

export function useAccessToken() {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    async function getAccessToken() {
      const token = await SecureStore.getItemAsync('client_token');
      if (token) {
        setAccessToken(token);
      } else {
        const newToken = await fetchAccessToken();
        setAccessToken(newToken);
      }
    }
    getAccessToken();
  }, []);
  return accessToken;
}
