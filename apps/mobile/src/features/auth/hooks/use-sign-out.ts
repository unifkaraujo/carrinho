import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryPersister } from '../../../shared/query/query-persister';
import { clearSessionToken } from '../../../shared/storage/session-token-storage';
import { authClient } from '../data/auth-client';

export const useSignOut = () => {
  const queryClient = useQueryClient();
  return useMutation({
    networkMode: 'always',
    mutationFn: async () => {
      await authClient.signOut().catch(() => undefined);
      await clearSessionToken();
      queryClient.clear();
      await queryPersister.removeClient();
    },
  });
};
