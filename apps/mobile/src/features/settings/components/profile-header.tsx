import { StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';

interface ProfileHeaderProps {
  name: string | undefined;
  email: string | undefined;
}

const AVATAR_SIZE = 64;

const initialOf = (name: string | undefined): string =>
  name?.trim().charAt(0).toLocaleUpperCase('pt-BR') ?? '?';

export const ProfileHeader = ({ name, email }: ProfileHeaderProps) => (
  <View style={styles.container}>
    <View style={styles.avatar}>
      <Text style={styles.initial}>{initialOf(name)}</Text>
    </View>
    <View style={styles.texts}>
      <Text accessibilityRole="header" style={styles.name} numberOfLines={1}>
        {name ?? 'Conta'}
      </Text>
      {email ? (
        <Text style={styles.email} numberOfLines={1}>
          {email}
        </Text>
      ) : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: { fontSize: fontSize.xl - 4, fontWeight: '800', color: colors.onPrimary },
  texts: { flex: 1, gap: 2 },
  name: { fontSize: fontSize.lg + 2, fontWeight: '800', color: colors.text },
  email: { fontSize: fontSize.md, color: colors.muted },
});
