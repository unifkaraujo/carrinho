import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from '../data/categories-api';
import { CATEGORIES_QUERY_KEY } from '../data/categories-query-key';

export const useCategories = () =>
  useQuery({ queryKey: CATEGORIES_QUERY_KEY, queryFn: fetchCategories });
