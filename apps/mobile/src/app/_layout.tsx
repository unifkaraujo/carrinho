import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useSession } from '../features/auth/hooks/use-session';
import { queryClient } from '../shared/query/query-client';

SplashScreen.preventAutoHideAsync();

const RootNavigator = () => {
  const { data: session, isPending } = useSession();
  useEffect(() => {
    if (!isPending) SplashScreen.hideAsync();
  }, [isPending]);
  if (isPending) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={Boolean(session)}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
};

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <StatusBar style="dark" />
    <RootNavigator />
  </QueryClientProvider>
);

export default RootLayout;
