import { useEffect, useEffectEvent } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from '../../../shared/ui/icon-button';
import { colors, fontSize, spacing } from '../../../shared/ui/theme';
import { useSpeechCapture } from '../voice/use-speech-capture';

interface VoiceCapturePanelProps {
  onCapture: (text: string) => void;
}

const describeVoiceState = (listening: boolean, transcript: string): string => {
  if (transcript) return transcript;
  return listening ? 'Ouvindo… fale o item' : 'Toque no microfone para falar';
};

export const VoiceCapturePanel = ({ onCapture }: VoiceCapturePanelProps) => {
  const speech = useSpeechCapture(onCapture);
  const startOnOpen = useEffectEvent(() => {
    speech.start();
  });

  useEffect(() => {
    startOnOpen();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.transcript}>
        {describeVoiceState(speech.listening, speech.transcript)}
      </Text>
      {speech.error ? <Text style={styles.error}>{speech.error}</Text> : null}
      <IconButton
        icon={speech.listening ? 'stop' : 'mic'}
        label={speech.listening ? 'Parar de ouvir' : 'Falar de novo'}
        onPress={speech.listening ? speech.stop : speech.start}
        active={speech.listening}
        size="lg"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.md, paddingVertical: spacing.sm },
  transcript: { fontSize: fontSize.lg, fontWeight: '600', color: colors.text, textAlign: 'center' },
  error: { fontSize: fontSize.sm, color: colors.danger, textAlign: 'center' },
});
