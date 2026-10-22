import { onlineManager, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { CAPTURE_MUTATION_KEY } from '../data/capture-mutation-key';
import { buildCaptureVariables } from '../domain/build-capture-variables';
import { OFFLINE_QUEUED_MESSAGE, type CaptureFlowStatus } from '../domain/capture-flow-status';
import type { CaptureResult } from '../domain/capture-result';
import type { CaptureVariables } from '../domain/capture-variables';
import { describeCaptureError } from '../domain/describe-capture-error';

export const useCaptureFlow = () => {
  const [status, setStatus] = useState<CaptureFlowStatus>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const mutation = useMutation<CaptureResult, Error, CaptureVariables>({
    mutationKey: CAPTURE_MUTATION_KEY,
  });

  const finish = (nextStatus: CaptureFlowStatus, nextMessage: string) => {
    setStatus(nextStatus);
    setMessage(nextMessage);
  };

  const capture = (text: string) => {
    setStatus('saving');
    mutation.mutate(buildCaptureVariables(text), {
      onSuccess: (result) => finish('done', result.message),
      onError: (error) => finish('failed', describeCaptureError(error)),
    });
    if (!onlineManager.isOnline()) finish('queued', OFFLINE_QUEUED_MESSAGE);
  };

  return { status, message, capture };
};
