import { StyleSheet, Text } from 'react-native';
import { colors, fontSize } from './theme';

interface FormErrorProps {
  message: string | null;
}

export const FormError = ({ message }: FormErrorProps) =>
  message ? (
    <Text accessibilityRole="alert" style={styles.error}>
      {message}
    </Text>
  ) : null;

const styles = StyleSheet.create({
  error: { color: colors.danger, fontSize: fontSize.sm, textAlign: 'center' },
});
