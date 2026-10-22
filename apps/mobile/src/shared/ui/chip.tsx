import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, fontSize, spacing } from './theme';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export const Chip = ({ label, selected = false, onPress }: ChipProps) => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    onPress={onPress}
    style={[styles.chip, selected && styles.selected]}
  >
    <Text style={[styles.label, selected && styles.selectedLabel]}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  selected: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontSize: fontSize.sm, color: colors.text },
  selectedLabel: { color: colors.onPrimary, fontWeight: '700' },
});
