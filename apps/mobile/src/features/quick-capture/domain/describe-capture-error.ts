import { ApiError } from '../../../shared/http/api-error';

const UNRECOGNIZED_ITEM_STATUS = 422;

export const describeCaptureError = (error: Error): string =>
  error instanceof ApiError && error.status === UNRECOGNIZED_ITEM_STATUS
    ? 'Não entendi o item. Tente de novo.'
    : 'Não foi possível adicionar. Tente de novo.';
