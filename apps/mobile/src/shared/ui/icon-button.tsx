import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from './theme';

interface IconButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress: () => void;
  active?: boolean;
  size?: 'md' | 'lg';
}

const SIZES = { md: 48, lg: 76 } as const;
const ICON_SIZES = { md: 22, lg: 34 } as const;

export const IconButton = ({
  icon,
  label,
  onPress,
  active = false,
  size = 'md',
}: IconButtonProps) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    style={({ pressed }) => [
      styles.button,
      { width: SIZES[size], height: SIZES[size], borderRadius: SIZES[size] / 2 },
      pressed && styles.pressed,
      active && styles.active,
    ]}
  >
    <Ionicons name={icon} size={ICON_SIZES[size]} color={colors.onPrimary} />
  </Pressable>
);

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  pressed: { backgroundColor: colors.primaryPressed },
  active: { backgroundColor: colors.danger },
});
