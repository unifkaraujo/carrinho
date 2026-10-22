import * as SecureStore from 'expo-secure-store';

const SESSION_TOKEN_KEY = 'meu-mercado.session-token';

export const readSessionToken = (): Promise<string | null> =>
  SecureStore.getItemAsync(SESSION_TOKEN_KEY);

export const saveSessionToken = (token: string): Promise<void> =>
  SecureStore.setItemAsync(SESSION_TOKEN_KEY, token);

export const clearSessionToken = (): Promise<void> =>
  SecureStore.deleteItemAsync(SESSION_TOKEN_KEY);
