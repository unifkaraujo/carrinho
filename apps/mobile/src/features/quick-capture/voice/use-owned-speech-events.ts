import {
  useSpeechRecognitionEvent,
  type ExpoSpeechRecognitionErrorCode,
  type ExpoSpeechRecognitionResultEvent,
} from 'expo-speech-recognition';
import type { RefObject } from 'react';

interface OwnedSpeechHandlers {
  onEnd: () => void;
  onError: (code: ExpoSpeechRecognitionErrorCode) => void;
  onResult: (event: ExpoSpeechRecognitionResultEvent) => void;
}

export const useOwnedSpeechEvents = (
  ownsRecognition: RefObject<boolean>,
  { onEnd, onError, onResult }: OwnedSpeechHandlers,
) => {
  useSpeechRecognitionEvent('end', () => {
    if (ownsRecognition.current) onEnd();
  });
  useSpeechRecognitionEvent('error', (event) => {
    if (ownsRecognition.current) onError(event.error);
  });
  useSpeechRecognitionEvent('result', (event) => {
    if (ownsRecognition.current) onResult(event);
  });
};
