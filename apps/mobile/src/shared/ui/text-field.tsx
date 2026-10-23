import {
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { colors, fontSize, radius, spacing } from './theme';

interface TextFieldProps extends TextInputProps {
  label: string;
  error?: string | undefined;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextField = ({
  label,
  error,
  style,
  containerStyle,
  ...inputProps
}: TextFieldProps) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error ? styles.inputError : null, style]}
      placeholderTextColor={colors.muted}
      selectionColor={colors.primary}
      {...inputProps}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: { gap: spacing.xs + 2 },
  label: { fontSize: fontSize.sm, color: colors.text, fontWeight: '700' },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 52,
    fontSize: fontSize.md,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger },
  error: { fontSize: fontSize.sm, color: colors.danger },
});
