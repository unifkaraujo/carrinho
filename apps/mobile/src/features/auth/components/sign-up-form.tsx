import { StyleSheet, View } from 'react-native';
import { useForm } from '../../../shared/form/use-form';
import { FormError } from '../../../shared/ui/form-error';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { TextField } from '../../../shared/ui/text-field';
import { spacing } from '../../../shared/ui/theme';
import { describeAuthError } from '../domain/describe-auth-error';
import { signUpSchema } from '../domain/sign-up-schema';
import { useSignUp } from '../hooks/use-sign-up';

const INITIAL_VALUES = { name: '', email: '', password: '' };

export const SignUpForm = () => {
  const { values, errors, setField, validate } = useForm(signUpSchema, INITIAL_VALUES);
  const signUp = useSignUp();
  const submit = () => {
    const data = validate();
    if (data) signUp.mutate(data);
  };

  return (
    <View style={styles.form}>
      <TextField
        label="Nome"
        value={values.name}
        onChangeText={setField('name')}
        error={errors.name}
        autoComplete="name"
      />
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
        autoComplete="new-password"
        onSubmitEditing={submit}
      />
      <FormError message={signUp.error ? describeAuthError(signUp.error) : null} />
      <PrimaryButton title="Criar conta" onPress={submit} loading={signUp.isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.md },
});
