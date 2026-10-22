import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../../shared/ui/theme';
import { useCaptureItem } from '../hooks/use-capture-item';
import { useSpeechCapture } from '../voice/use-speech-capture';
import { IconButton } from '../../../shared/ui/icon-button';

export const CaptureBar = () => {
  const [text, setText] = useState('');
  const capture = useCaptureItem();
  const speech = useSpeechCapture(capture);
  const hasText = text.trim().length > 0;

  const submit = () => {
    if (!hasText) return;
    capture(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      {speech.error ? <Text style={styles.error}>{speech.error}</Text> : null}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={speech.listening ? speech.transcript : text}
          onChangeText={setText}
          editable={!speech.listening}
          placeholder={speech.listening ? 'Ouvindo…' : 'Adicionar item (ex.: 2 dúzias de ovos)'}
          placeholderTextColor={colors.muted}
          returnKeyType="done"
          submitBehavior="submit"
          onSubmitEditing={submit}
        />
        {hasText && !speech.listening ? (
          <IconButton icon="arrow-up" label="Adicionar" onPress={submit} />
        ) : (
          <IconButton
            icon={speech.listening ? 'stop' : 'mic'}
            label={speech.listening ? 'Parar de ouvir' : 'Adicionar por voz'}
            onPress={speech.listening ? speech.stop : speech.start}
            active={speech.listening}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md * 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + spacing.xs,
    fontSize: fontSize.md,
    color: colors.text,
  },
  error: { fontSize: fontSize.sm, color: colors.danger },
});
