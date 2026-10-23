import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import { useOnlineStatus } from '../query/use-online-status';
import { usePendingChangesCount } from '../query/use-pending-changes-count';
import { colors, fontSize, radius, spacing } from './theme';

const describePending = (count: number): string => {
  if (count === 0) return 'Você está offline. Mostrando a última lista salva.';
  const changes =
    count === 1 ? '1 alteração será sincronizada' : `${count} alterações serão sincronizadas`;
  return `Você está offline. ${changes} quando a conexão voltar.`;
};

export const OfflineBanner = () => {
  const online = useOnlineStatus();
  const pendingCount = usePendingChangesCount();
  if (online) return null;
  return (
    <View accessibilityRole="alert" style={styles.banner}>
      <Ionicons name="cloud-offline-outline" size={18} color={colors.background} />
      <Text style={styles.text}>{describePending(pendingCount)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.text,
    borderRadius: radius.md,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
  },
  text: { flex: 1, color: colors.background, fontSize: fontSize.sm },
});
