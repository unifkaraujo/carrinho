import { Link, type Href } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { colors, fontSize } from './theme';

interface TextLinkProps {
  href: Href;
  prefix: string;
  label: string;
}

export const TextLink = ({ href, prefix, label }: TextLinkProps) => (
  <Text style={styles.text}>
    {prefix}{' '}
    <Link href={href} replace style={styles.link}>
      {label}
    </Link>
  </Text>
);

const styles = StyleSheet.create({
  text: { textAlign: 'center', color: colors.muted, fontSize: fontSize.md },
  link: { color: colors.primary, fontWeight: '700' },
});
