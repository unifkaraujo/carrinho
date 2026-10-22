import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text } from 'react-native';
import { colors, fontSize } from '../../../shared/ui/theme';
import { CaptureSheet } from '../components/capture-sheet';
import { CaptureStatus } from '../components/capture-status';
import { TextCapturePanel } from '../components/text-capture-panel';
import { VoiceCapturePanel } from '../components/voice-capture-panel';
import { parseCaptureParams } from '../domain/parse-capture-params';
import { useCaptureFlow } from '../hooks/use-capture-flow';
import { closeCapture, useAutoCloseCapture } from '../hooks/use-close-capture';

export const QuickCaptureScreen = () => {
  const { mode, source } = parseCaptureParams(useLocalSearchParams());
  const flow = useCaptureFlow();
  useAutoCloseCapture(flow.status, source);
  const idle = flow.status === 'idle' || flow.status === 'failed';

  return (
    <CaptureSheet onDismiss={() => closeCapture(source)}>
      <Text style={styles.title}>Adicionar à lista</Text>
      {idle && mode === 'voice' ? <VoiceCapturePanel onCapture={flow.capture} /> : null}
      {idle && mode === 'text' ? <TextCapturePanel onCapture={flow.capture} /> : null}
      <CaptureStatus status={flow.status} message={flow.message} />
    </CaptureSheet>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: fontSize.lg, fontWeight: '800', color: colors.text, textAlign: 'center' },
});
