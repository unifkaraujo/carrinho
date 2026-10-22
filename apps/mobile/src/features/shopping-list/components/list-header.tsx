import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Heading } from '../../../shared/ui/heading';
import { colors, spacing } from '../../../shared/ui/theme';

interface ListHeaderProps {
  pendingCount: number;
}

const describePending = (count: number): string => {
  if (count === 0) return 'Nada pendente';
  return count === 1 ? '1 item pendente' : `${count} itens pendentes`;
};

export const ListHeader = ({ pendingCount }: ListHeaderProps) => (
  <View style={styles.header}>
    <Heading title="Lista de compras" subtitle={describePending(pendingCount)} />
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Configurações"
      onPress={() => router.push('/settings')}
      hitSlop={spacing.sm}
    >
      <Ionicons name="settings-outline" size={24} color={colors.muted} />
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: spacing.sm,
  },
});
