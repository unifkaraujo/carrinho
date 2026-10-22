import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authClient } from '../data/auth-client';
import { clearSessionToken } from '../data/session-token-storage';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await authClient.signOut().catch(() => undefined);
      await clearSessionToken();
      queryClient.clear();
    },
  });
};
