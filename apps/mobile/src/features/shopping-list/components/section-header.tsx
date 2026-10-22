import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';

interface SectionAction {
  label: string;
  onPress: () => void;
}

interface SectionHeaderProps {
  title: string;
  count: number;
  action?: SectionAction | undefined;
}

export const SectionHeader = ({ title, count, action }: SectionHeaderProps) => (
  <View style={styles.header}>
    <Text style={styles.title}>
      {title} <Text style={styles.count}>({count})</Text>
    </Text>
    {action ? (
      <Pressable accessibilityRole="button" onPress={action.onPress} hitSlop={spacing.sm}>
        <Text style={styles.action}>{action.label}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.muted,
    textTransform: 'uppercase',
  },
  count: { fontWeight: '400' },
  action: { fontSize: fontSize.sm, fontWeight: '700', color: colors.danger },
});
