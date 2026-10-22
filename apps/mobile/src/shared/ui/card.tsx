import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from './theme';

interface CardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const Card = ({ title, description, children }: CardProps) => (
  <View style={styles.card}>
    <Text accessibilityRole="header" style={styles.title}>
      {title}
    </Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  title: { fontSize: fontSize.md, fontWeight: '800', color: colors.text },
  description: { fontSize: fontSize.sm, color: colors.muted },
});
