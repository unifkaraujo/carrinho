import { router } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { FINISHED_STATUSES, type CaptureFlowStatus } from '../domain/capture-flow-status';
import type { CaptureSource } from '../domain/capture-links';

const AUTO_CLOSE_DELAY_MS = 1400;

export const closeCapture = (source: CaptureSource) => {
  if (source === 'app' && router.canGoBack()) router.back();
  else BackHandler.exitApp();
};

export const useAutoCloseCapture = (status: CaptureFlowStatus, source: CaptureSource) => {
  useEffect(() => {
    if (!FINISHED_STATUSES.has(status)) return;
    const timer = setTimeout(() => closeCapture(source), AUTO_CLOSE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [status, source]);
};
