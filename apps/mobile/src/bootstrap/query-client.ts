import { QueryClient } from '@tanstack/react-query';
import { registerCaptureMutation } from '../features/quick-capture/data/register-capture-mutation';
import { registerItemMutations } from '../features/shopping-list/data/register-item-mutations';

export const queryClient = new QueryClient();

registerItemMutations(queryClient);
registerCaptureMutation(queryClient);
