import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../../shared/ui/theme';

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
    <View style={styles.titleRow}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.count}>
        <Text style={styles.countText}>{count}</Text>
      </View>
    </View>
    {action ? (
      <Pressable
        accessibilityRole="button"
        onPress={action.onPress}
        hitSlop={spacing.sm}
        style={styles.action}
      >
        <Ionicons name="trash-outline" size={14} color={colors.danger} />
        <Text style={styles.actionText}>{action.label}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  title: { fontSize: fontSize.md, fontWeight: '800', color: colors.text },
  count: {
    minWidth: 24,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
  },
  countText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.muted },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm + 4,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.dangerSoft,
  },
  actionText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.danger },
});
