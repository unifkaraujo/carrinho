import * as Clipboard from 'expo-clipboard';
import { StyleSheet, Text, View } from 'react-native';
import { API_URL } from '../../../shared/config/api-url';
import { showToast } from '../../../shared/ui/show-toast';
import { TextButton } from '../../../shared/ui/text-button';
import { colors, fontSize, radius, spacing } from '../../../shared/ui/theme';

interface IssuedTokenNoticeProps {
  token: string;
}

const copy = async (text: string, message: string) => {
  await Clipboard.setStringAsync(text);
  showToast(message);
};

export const IssuedTokenNotice = ({ token }: IssuedTokenNoticeProps) => (
  <View style={styles.notice}>
    <Text style={styles.warning}>Copie agora: este token não será exibido de novo.</Text>
    <Text selectable style={styles.code}>
      {token}
    </Text>
    <TextButton label="Copiar token" tone="primary" onPress={() => copy(token, 'Token copiado')} />
    <Text style={styles.help}>
      Use em atalhos externos: POST {API_URL}/capture com o cabeçalho Authorization: Bearer
      &lt;token&gt; e o corpo {'{"text": "2 dúzias de ovos"}'}.
    </Text>
  </View>
);

const styles = StyleSheet.create({
  notice: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  warning: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  code: { fontFamily: 'monospace', fontSize: fontSize.sm, color: colors.text },
  help: { fontSize: fontSize.sm, color: colors.muted },
});
