import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../../shared/ui/theme';

interface CaptureSheetProps {
  children: ReactNode;
  onDismiss: () => void;
}

export const CaptureSheet = ({ children, onDismiss }: CaptureSheetProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.overlay}>
      <Pressable
        style={styles.backdrop}
        accessibilityLabel="Fechar"
        accessibilityRole="button"
        onPress={onDismiss}
      />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(0, 0, 0, 0.45)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.md * 2,
    borderTopRightRadius: radius.md * 2,
    padding: spacing.lg,
    gap: spacing.md,
  },
});
