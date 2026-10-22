import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, fontSize, radius, spacing } from './theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | undefined;
}

export const TextField = ({ label, error, style, ...inputProps }: TextFieldProps) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : null, style]}
      placeholderTextColor={colors.muted}
      {...inputProps}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  label: { fontSize: fontSize.sm, color: colors.muted, fontWeight: '600' },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + spacing.xs,
    fontSize: fontSize.md,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  error: { fontSize: fontSize.sm, color: colors.danger },
});
