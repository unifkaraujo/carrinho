const PRODUCTION_API_URL = 'https://meu-mercado-api.meu-mercado-api.workers.dev';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? PRODUCTION_API_URL;
