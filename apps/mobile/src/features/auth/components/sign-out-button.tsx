import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';
import { useSignOut } from '../hooks/use-sign-out';

export const SignOutButton = () => {
  const signOut = useSignOut();
  return (
    <Pressable
      accessibilityRole="button"
      disabled={signOut.isPending}
      onPress={() => signOut.mutate()}
      hitSlop={spacing.sm}
    >
      <Text style={styles.label}>Sair</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: { color: colors.muted, fontSize: fontSize.md, fontWeight: '600' },
});
