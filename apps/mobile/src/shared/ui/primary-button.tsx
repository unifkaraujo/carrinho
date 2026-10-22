import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, radius, spacing } from './theme';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

export const PrimaryButton = ({ title, onPress, loading = false }: PrimaryButtonProps) => (
  <Pressable
    accessibilityRole="button"
    disabled={loading}
    onPress={onPress}
    style={({ pressed }) => [styles.button, pressed && styles.pressed, loading && styles.loading]}
  >
    {loading ? (
      <ActivityIndicator color={colors.onPrimary} />
    ) : (
      <Text style={styles.title}>{title}</Text>
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  pressed: { backgroundColor: colors.primaryPressed },
  loading: { opacity: 0.8 },
  title: { color: colors.onPrimary, fontSize: fontSize.md, fontWeight: '700' },
});
