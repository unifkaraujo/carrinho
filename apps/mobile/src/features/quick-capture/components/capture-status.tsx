import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import { colors, fontSize } from '../../../shared/ui/theme';
import type { CaptureFlowStatus } from '../domain/capture-flow-status';

interface CaptureStatusProps {
  status: CaptureFlowStatus;
  message: string | null;
}

export const CaptureStatus = ({ status, message }: CaptureStatusProps) => {
  if (status === 'saving') return <ActivityIndicator color={colors.primary} />;
  if (!message) return null;
  return (
    <Text
      accessibilityRole="alert"
      style={[styles.message, status === 'failed' ? styles.failed : styles.success]}
    >
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  message: { fontSize: fontSize.md, fontWeight: '700', textAlign: 'center' },
  success: { color: colors.primary },
  failed: { color: colors.danger },
});
