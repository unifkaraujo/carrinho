import { useQuickActionRouting } from 'expo-quick-actions/router';
import { useEffect } from 'react';
import { registerCaptureShortcuts } from './register-capture-shortcuts';

export const useCaptureShortcuts = () => {
  useQuickActionRouting();
  useEffect(() => {
    registerCaptureShortcuts();
  }, []);
};
