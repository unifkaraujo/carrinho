import { QueryClient } from '@tanstack/react-query';
import { registerItemMutations } from '../features/shopping-list/data/register-item-mutations';

export const queryClient = new QueryClient();

registerItemMutations(queryClient);
