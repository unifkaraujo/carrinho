import { StyleSheet, Text, View } from 'react-native';
import { BrandMark } from '../../../shared/ui/brand-mark';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';

interface AuthHeaderProps {
  tagline: string;
}

export const AuthHeader = ({ tagline }: AuthHeaderProps) => (
  <View style={styles.container}>
    <BrandMark size="lg" />
    <Text style={styles.tagline}>{tagline}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.sm, marginBottom: spacing.md },
  tagline: { fontSize: fontSize.md, color: colors.muted, textAlign: 'center', lineHeight: 22 },
});
