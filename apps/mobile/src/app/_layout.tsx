import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { QueryProvider } from '../bootstrap/query-provider';
import { useAuthStatus } from '../features/auth/hooks/use-auth-status';
import { useLockScreenCaptureSync } from '../features/lock-screen-capture/hooks/use-lock-screen-capture-sync';
import { useAppStateFocus } from '../shared/query/use-app-state-focus';

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const status = useAuthStatus();
  useLockScreenCaptureSync(status);
  useEffect(() => {
    if (status !== 'loading') SplashScreen.hideAsync();
  }, [status]);
  if (status === 'loading') return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={status === 'signed-in'}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={status === 'signed-out'}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => {
  useAppStateFocus();
  return (
    <QueryProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </QueryProvider>
  );
};

export default RootLayout;
