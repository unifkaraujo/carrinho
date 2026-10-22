import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from './theme';

interface HeadingProps {
  title: string;
  subtitle?: string;
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
  title: { fontSize: fontSize.xl, fontWeight: '800', color: colors.text },
  subtitle: { fontSize: fontSize.md, color: colors.muted },
});
