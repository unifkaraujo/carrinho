import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../../../shared/ui/theme';

interface CaptureSheetProps {
  children: ReactNode;
  onDismiss: () => void;
}

export const CaptureSheet = ({ children, onDismiss }: CaptureSheetProps) => {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={styles.overlay} behavior="padding">
      <Pressable
        style={styles.backdrop}
        accessibilityLabel="Fechar"
        accessibilityRole="button"
        onPress={onDismiss}
      />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.handle} />
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFill, backgroundColor: 'rgba(10, 25, 16, 0.5)' },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg + 4,
    borderTopRightRadius: radius.lg + 4,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm + 2,
    gap: spacing.md,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    marginBottom: spacing.xs,
  },
});
