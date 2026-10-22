import { useForm } from '../../../shared/form/use-form';
import { Card } from '../../../shared/ui/card';
import { FormError } from '../../../shared/ui/form-error';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { showToast } from '../../../shared/ui/show-toast';
import { TextField } from '../../../shared/ui/text-field';
import { changePasswordSchema } from '../domain/change-password-schema';
import { describeAuthError } from '../domain/describe-auth-error';
import { useChangePassword } from '../hooks/use-change-password';

const INITIAL_VALUES = { currentPassword: '', newPassword: '' };

export const ChangePasswordForm = () => {
  const form = useForm(changePasswordSchema, INITIAL_VALUES);
  const changePassword = useChangePassword();

  const submit = () => {
    const data = form.validate();
    if (data) changePassword.mutate(data, { onSuccess: () => showToast('Senha alterada') });
  };

  return (
    <Card title="Alterar senha">
      <TextField
        label="Senha atual"
        value={form.values.currentPassword}
        onChangeText={form.setField('currentPassword')}
        error={form.errors.currentPassword}
        secureTextEntry
        autoComplete="current-password"
      />
      <TextField
        label="Nova senha"
        value={form.values.newPassword}
        onChangeText={form.setField('newPassword')}
        error={form.errors.newPassword}
        secureTextEntry
        autoComplete="new-password"
      />
      <FormError message={changePassword.error ? describeAuthError(changePassword.error) : null} />
      <PrimaryButton title="Alterar senha" onPress={submit} loading={changePassword.isPending} />
    </Card>
  );
};
