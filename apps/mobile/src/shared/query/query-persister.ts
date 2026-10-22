import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const PERSISTED_CACHE_KEY = 'meu-mercado.query-cache';

export const queryPersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: PERSISTED_CACHE_KEY,
});

export const PERSISTED_CACHE_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30;
export const PERSISTED_CACHE_BUSTER = 'v1';
