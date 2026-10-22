import { useMutation } from '@tanstack/react-query';
import { ApiError } from '../../../shared/http/api-error';
import { showToast } from '../../../shared/ui/show-toast';
import { LOCAL_ITEM_ID_PREFIX } from '../../shopping-list/domain/local-item';
import { CAPTURE_MUTATION_KEY } from '../data/capture-mutation-key';
import type { CaptureResult } from '../domain/capture-result';
import type { CaptureVariables } from '../domain/capture-variables';

const UNRECOGNIZED_ITEM_STATUS = 422;

const describeCaptureError = (error: Error): string =>
  error instanceof ApiError && error.status === UNRECOGNIZED_ITEM_STATUS
    ? 'Não entendi o item. Tente de novo.'
    : 'Não foi possível adicionar. Tente de novo.';

const buildVariables = (text: string): CaptureVariables => ({
  text,
  localId: `${LOCAL_ITEM_ID_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2)}`,
  capturedAt: new Date().toISOString(),
});

export const useCaptureItem = () => {
  const mutation = useMutation<CaptureResult, Error, CaptureVariables>({
    mutationKey: CAPTURE_MUTATION_KEY,
    onSuccess: (result) => showToast(result.message),
    onError: (error) => showToast(describeCaptureError(error)),
  });
  return (text: string) => mutation.mutate(buildVariables(text.trim()));
};
