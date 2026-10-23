import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '../../../shared/ui/brand-mark';
import { ProgressBar } from '../../../shared/ui/progress-bar';
import { colors, fontSize, radius, shadow, spacing } from '../../../shared/ui/theme';
import { describeListSummary } from '../domain/describe-list-summary';

interface ListHeaderProps {
  pendingCount: number;
  boughtCount: number;
}

export const ListHeader = ({ pendingCount, boughtCount }: ListHeaderProps) => {
  const summary = describeListSummary(pendingCount, boughtCount);
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <BrandMark />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Configurações"
          onPress={() => router.push('/settings')}
          hitSlop={spacing.sm}
          style={({ pressed }) => [styles.settings, pressed && styles.settingsPressed]}
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
        </Pressable>
      </View>
      <View style={styles.summary}>
        <Text accessibilityRole="header" style={styles.title}>
          {summary.title}
        </Text>
        <Text style={styles.subtitle}>{summary.subtitle}</Text>
        <ProgressBar
          progress={summary.progress}
          trackColor="rgba(255, 255, 255, 0.3)"
          fillColor={colors.onPrimary}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: spacing.lg, paddingBottom: spacing.sm },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  settings: {
    ...shadow,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsPressed: { backgroundColor: colors.surfaceMuted },
  summary: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  title: { fontSize: fontSize.xl - 4, fontWeight: '800', color: colors.onPrimary },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.onPrimary,
    opacity: 0.85,
    marginBottom: spacing.sm,
  },
});
