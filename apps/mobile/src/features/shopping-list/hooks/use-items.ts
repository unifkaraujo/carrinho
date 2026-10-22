import { useQuery } from '@tanstack/react-query';
import { fetchItems } from '../data/items-api';
import { ITEMS_QUERY_KEY } from '../data/items-query-key';

export const useItems = () => useQuery({ queryKey: ITEMS_QUERY_KEY, queryFn: fetchItems });
