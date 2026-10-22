import { Stack } from 'expo-router';

const AuthLayout = () => (
  <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="sign-up" />
  </Stack>
);

export default AuthLayout;
