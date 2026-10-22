import { StyleSheet, Text, View } from 'react-native';
import { SignOutButton } from '../../auth/components/sign-out-button';
import { useSession } from '../../auth/hooks/use-session';
import { Heading } from '../../../shared/ui/heading';
import { Screen } from '../../../shared/ui/screen';
import { colors, fontSize } from '../../../shared/ui/theme';

export const ShoppingListScreen = () => {
  const { data: session } = useSession();
  return (
    <Screen>
      <View style={styles.header}>
        <Heading title="Lista" subtitle={`Olá, ${session?.user.name ?? ''}`} />
        <SignOutButton />
      </View>
      <Text style={styles.placeholder}>Sua lista aparece aqui.</Text>
    </Screen>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  placeholder: { color: colors.muted, fontSize: fontSize.md },
});
