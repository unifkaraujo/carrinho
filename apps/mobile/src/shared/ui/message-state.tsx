import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from './theme';

interface MessageStateProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const MessageState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: MessageStateProps) => (
  <View style={styles.container}>
    <View style={styles.iconCircle}>
      <Ionicons name={icon} size={36} color={colors.primary} />
    </View>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {actionLabel && onAction ? (
      <Pressable accessibilityRole="button" onPress={onAction} hitSlop={spacing.sm}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl * 1.5,
    paddingHorizontal: spacing.lg,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, textAlign: 'center' },
  description: {
    fontSize: fontSize.md,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  action: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
});
