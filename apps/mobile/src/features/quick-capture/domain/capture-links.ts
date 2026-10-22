export type CaptureMode = 'voice' | 'text';
export type CaptureSource = 'widget' | 'shortcut' | 'app';

const APP_SCHEME = 'meumercado';

export const buildCaptureHref = (mode: CaptureMode, source: CaptureSource) =>
  `/capture?mode=${mode}&source=${source}` as const;

export const buildCaptureUri = (mode: CaptureMode, source: CaptureSource): string =>
  `${APP_SCHEME}:/${buildCaptureHref(mode, source)}`;
