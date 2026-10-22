import { StyleSheet, View } from 'react-native';
import { SignOutButton } from '../../auth/components/sign-out-button';
import { Heading } from '../../../shared/ui/heading';
import { spacing } from '../../../shared/ui/theme';

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
    <SignOutButton />
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
