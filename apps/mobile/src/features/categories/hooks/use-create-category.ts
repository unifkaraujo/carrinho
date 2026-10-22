import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '../data/categories-api';
import { CATEGORIES_QUERY_KEY } from '../data/categories-query-key';

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: CATEGORIES_QUERY_KEY }),
  });
};
