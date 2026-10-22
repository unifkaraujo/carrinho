import { onlineManager } from '@tanstack/react-query';
import { useSyncExternalStore } from 'react';

const subscribe = (onChange: () => void) => onlineManager.subscribe(onChange);
const getSnapshot = () => onlineManager.isOnline();

export const useOnlineStatus = (): boolean => useSyncExternalStore(subscribe, getSnapshot);
