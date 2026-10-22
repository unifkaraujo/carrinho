import { Stack } from 'expo-router';
import { colors } from '../../shared/ui/theme';

const AppLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false,
      headerStyle: { backgroundColor: colors.background },
      headerTintColor: colors.text,
      headerShadowVisible: false,
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen
      name="item/[id]"
      options={{ presentation: 'modal', headerShown: true, title: 'Editar item' }}
    />
  </Stack>
);

export default AppLayout;
