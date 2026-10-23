import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { APP_NAME } from '../config/app-name';
import { colors, fontSize, radius, spacing } from './theme';

interface BrandMarkProps {
  size?: 'sm' | 'lg';
}

export const BrandMark = ({ size = 'sm' }: BrandMarkProps) => {
  const large = size === 'lg';
  return (
    <View style={[styles.container, large && styles.containerLarge]}>
      <View style={[styles.badge, large && styles.badgeLarge]}>
        <Ionicons name="cart" size={large ? 40 : 20} color={colors.onPrimary} />
      </View>
      <Text style={[styles.name, large && styles.nameLarge]}>{APP_NAME}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  containerLarge: { flexDirection: 'column', gap: spacing.md },
  badge: {
    width: 36,
    height: 36,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLarge: { width: 80, height: 80, borderRadius: radius.lg },
  name: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, letterSpacing: -0.3 },
  nameLarge: { fontSize: fontSize.xl + 4, letterSpacing: -0.8 },
});
