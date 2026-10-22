import { StyleSheet, View } from 'react-native';
import { useForm } from '../../../shared/form/use-form';
import { FormError } from '../../../shared/ui/form-error';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { TextField } from '../../../shared/ui/text-field';
import { spacing } from '../../../shared/ui/theme';
import { describeAuthError } from '../domain/describe-auth-error';
import { signInSchema } from '../domain/sign-in-schema';
import { useSignIn } from '../hooks/use-sign-in';

export const SignInForm = () => {
  const { values, errors, setField, validate } = useForm(signInSchema, { email: '', password: '' });
  const signIn = useSignIn();
  const submit = () => {
    const credentials = validate();
    if (credentials) signIn.mutate(credentials);
  };

  return (
    <View style={styles.form}>
      <TextField
        label="E-mail"
        value={values.email}
        onChangeText={setField('email')}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextField
        label="Senha"
        value={values.password}
        onChangeText={setField('password')}
        error={errors.password}
        secureTextEntry
        autoComplete="current-password"
        onSubmitEditing={submit}
      />
      <FormError message={signIn.error ? describeAuthError(signIn.error) : null} />
      <PrimaryButton title="Entrar" onPress={submit} loading={signIn.isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.md },
});
