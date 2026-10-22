import { authClient } from '../data/auth-client';

export const useSession = () => authClient.useSession();
