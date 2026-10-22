import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card } from '../../../shared/ui/card';
import { FormError } from '../../../shared/ui/form-error';
import { PrimaryButton } from '../../../shared/ui/primary-button';
import { TextField } from '../../../shared/ui/text-field';
import { spacing } from '../../../shared/ui/theme';
import { useCaptureTokens } from '../hooks/use-capture-tokens';
import { CaptureTokenRow } from './capture-token-row';
import { IssuedTokenNotice } from './issued-token-notice';

const DEFAULT_LABEL = 'Atalho';

export const CaptureTokensCard = () => {
  const { list, issue, revoke } = useCaptureTokens();
  const [label, setLabel] = useState('');

  const create = () => {
    issue.mutate(label.trim() || DEFAULT_LABEL);
    setLabel('');
  };

  return (
    <Card
      title="Tokens de captura"
      description="Para adicionar itens por atalhos externos (HTTP Shortcuts, automações) sem login."
    >
      {(list.data ?? []).map((captureToken) => (
        <CaptureTokenRow
          key={captureToken.id}
          captureToken={captureToken}
          onRevoke={revoke.mutate}
        />
      ))}
      {issue.data ? <IssuedTokenNotice token={issue.data.token} /> : null}
      <View style={styles.form}>
        <TextField
          label="Nome do novo token"
          value={label}
          onChangeText={setLabel}
          placeholder="Ex.: Widget do celular"
        />
        <FormError message={issue.isError ? 'Não foi possível criar o token.' : null} />
        <PrimaryButton title="Criar token" onPress={create} loading={issue.isPending} />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  form: { gap: spacing.sm },
});
