import { useMutation } from '@tanstack/react-query';
import { showToast } from '../../../shared/ui/show-toast';
import { CAPTURE_MUTATION_KEY } from '../data/capture-mutation-key';
import { buildCaptureVariables } from '../domain/build-capture-variables';
import type { CaptureResult } from '../domain/capture-result';
import type { CaptureVariables } from '../domain/capture-variables';
import { describeCaptureError } from '../domain/describe-capture-error';

export const useCaptureItem = () => {
  const mutation = useMutation<CaptureResult, Error, CaptureVariables>({
    mutationKey: CAPTURE_MUTATION_KEY,
    onSuccess: (result) => showToast(result.message),
    onError: (error) => showToast(describeCaptureError(error)),
  });
  return (text: string) => mutation.mutate(buildCaptureVariables(text));
};
