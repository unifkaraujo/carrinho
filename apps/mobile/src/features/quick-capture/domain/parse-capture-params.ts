import type { CaptureMode, CaptureSource } from './capture-links';

interface RawCaptureParams {
  mode?: string | string[];
  source?: string | string[];
}

interface CaptureParams {
  mode: CaptureMode;
  source: CaptureSource;
}

const SOURCES: readonly CaptureSource[] = ['widget', 'shortcut', 'app'];

export const parseCaptureParams = ({ mode, source }: RawCaptureParams): CaptureParams => ({
  mode: mode === 'text' ? 'text' : 'voice',
  source: SOURCES.find((known) => known === source) ?? 'app',
});
