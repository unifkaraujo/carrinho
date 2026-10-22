import { useMutationState } from '@tanstack/react-query';

export const usePendingChangesCount = (): number =>
  useMutationState({ filters: { status: 'pending' } }).length;
