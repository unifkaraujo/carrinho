import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from './theme';

interface HeadingProps {
  title: string;
  subtitle?: string | undefined;
}

export const Heading = ({ title, subtitle }: HeadingProps) => (
  <View style={styles.container}>
    <Text accessibilityRole="header" style={styles.title}>
      {title}
    </Text>
    {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  title: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text, letterSpacing: -0.6 },
  subtitle: { fontSize: fontSize.md, color: colors.muted },
});
