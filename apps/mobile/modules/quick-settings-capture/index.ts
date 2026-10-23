import { requireOptionalNativeModule } from 'expo';

interface QuickSettingsCaptureModule {
  saveCredentials(apiUrl: string, tokenId: string, token: string): void;
  readTokenId(): string | null;
  clearCredentials(): void;
}

export const QuickSettingsCapture =
  requireOptionalNativeModule<QuickSettingsCaptureModule>('QuickSettingsCapture');
