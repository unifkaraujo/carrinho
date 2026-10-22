import { LOCAL_ITEM_ID_PREFIX } from '../../shopping-list/domain/local-item';
import type { CaptureVariables } from './capture-variables';

const randomSuffix = () => Math.random().toString(36).slice(2);

export const buildCaptureVariables = (text: string, now = new Date()): CaptureVariables => ({
  text: text.trim(),
  localId: `${LOCAL_ITEM_ID_PREFIX}${now.getTime()}-${randomSuffix()}`,
  capturedAt: now.toISOString(),
});
