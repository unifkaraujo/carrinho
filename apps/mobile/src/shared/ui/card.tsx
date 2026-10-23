import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from './theme';

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => (
  <View style={styles.card}>
    <View style={styles.header}>
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    ...shadow,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: { gap: spacing.xs },
  title: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text },
  description: { fontSize: fontSize.sm, color: colors.muted, lineHeight: 19 },
});
