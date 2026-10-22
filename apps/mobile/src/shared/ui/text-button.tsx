import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, spacing } from './theme';

type TextButtonTone = 'muted' | 'danger' | 'primary';

interface TextButtonProps {
  label: string;
  onPress: () => void;
  tone?: TextButtonTone;
  disabled?: boolean;
}

const TONE_COLORS: Record<TextButtonTone, string> = {
  muted: colors.muted,
  danger: colors.danger,
  primary: colors.primary,
};

export const TextButton = ({
  label,
  onPress,
  tone = 'muted',
  disabled = false,
}: TextButtonProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    disabled={disabled}
    hitSlop={spacing.sm}
    style={({ pressed }) => (pressed || disabled) && styles.dimmed}
  >
    <Text style={[styles.label, { color: TONE_COLORS[tone] }]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  label: { fontSize: fontSize.md, fontWeight: '600', textAlign: 'center' },
  dimmed: { opacity: 0.5 },
});
