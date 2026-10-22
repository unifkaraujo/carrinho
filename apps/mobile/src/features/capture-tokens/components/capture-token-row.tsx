import { StyleSheet, Text, View } from 'react-native';
import { confirm } from '../../../shared/ui/confirm';
import { TextButton } from '../../../shared/ui/text-button';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';
import type { CaptureToken } from '../domain/capture-token';
import { describeLastUse } from '../domain/describe-last-use';

interface CaptureTokenRowProps {
  captureToken: CaptureToken;
  onRevoke: (id: string) => void;
}

export const CaptureTokenRow = ({ captureToken, onRevoke }: CaptureTokenRowProps) => {
  const confirmRevoke = () =>
    confirm({
      title: 'Revogar token',
      message: `Atalhos usando "${captureToken.label}" vão parar de funcionar.`,
      confirmLabel: 'Revogar',
      onConfirm: () => onRevoke(captureToken.id),
    });

  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.label}>{captureToken.label}</Text>
        <Text style={styles.meta}>{describeLastUse(captureToken.lastUsedAt)}</Text>
      </View>
      <TextButton label="Revogar" tone="danger" onPress={confirmRevoke} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  info: { flex: 1, gap: 2 },
  label: { fontSize: fontSize.md, color: colors.text },
  meta: { fontSize: fontSize.sm, color: colors.muted },
});
