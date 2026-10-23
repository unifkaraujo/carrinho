import { Stack } from 'expo-router';
import { useCaptureShortcuts } from '../../features/quick-capture/shortcuts/use-capture-shortcuts';
import { colors } from '../../shared/ui/theme';

const AppLayout = () => {
  useCaptureShortcuts();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="list" />
      <Stack.Screen
        name="item/[id]"
        options={{ presentation: 'modal', headerShown: true, title: 'Editar item' }}
      />
      <Stack.Screen name="settings" options={{ headerShown: true, title: 'Configurações' }} />
      <Stack.Screen
        name="capture"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack>
  );
};

export default AppLayout;
