import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { IconButton } from '../../../shared/ui/icon-button';
import { colors, fontSize, radius, spacing } from '../../../shared/ui/theme';

interface TextCapturePanelProps {
  onCapture: (text: string) => void;
}

export const TextCapturePanel = ({ onCapture }: TextCapturePanelProps) => {
  const [text, setText] = useState('');
  const submit = () => {
    if (text.trim()) onCapture(text);
  };

  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        autoFocus
        placeholder="Ex.: 2 dúzias de ovos"
        placeholderTextColor={colors.muted}
        returnKeyType="done"
        onSubmitEditing={submit}
      />
      <IconButton icon="arrow-up" label="Adicionar" onPress={submit} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + spacing.xs,
    fontSize: fontSize.md,
    color: colors.text,
  },
});
