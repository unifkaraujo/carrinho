import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchCaptureTokens,
  issueCaptureToken,
  revokeCaptureToken,
} from '../data/capture-tokens-api';
import { CAPTURE_TOKENS_QUERY_KEY } from '../data/capture-tokens-query-key';

export const useCaptureTokens = () => {
  const queryClient = useQueryClient();
  const refresh = () => queryClient.invalidateQueries({ queryKey: CAPTURE_TOKENS_QUERY_KEY });

  const list = useQuery({ queryKey: CAPTURE_TOKENS_QUERY_KEY, queryFn: fetchCaptureTokens });
  const issue = useMutation({ mutationFn: issueCaptureToken, onSuccess: refresh });
  const revoke = useMutation({ mutationFn: revokeCaptureToken, onSuccess: refresh });

  return { list, issue, revoke };
};
