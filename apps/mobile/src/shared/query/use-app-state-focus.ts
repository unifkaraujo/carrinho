import { focusManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

const onAppStateChange = (status: AppStateStatus) => focusManager.setFocused(status === 'active');

export const useAppStateFocus = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);
};
