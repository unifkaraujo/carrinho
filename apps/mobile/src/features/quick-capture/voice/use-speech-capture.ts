import { useRef, useState } from 'react';
import { describeSpeechError } from './describe-speech-error';
import { startSpeechRecognition, stopSpeechRecognition } from './start-speech-recognition';
import { useOwnedSpeechEvents } from './use-owned-speech-events';

const PERMISSION_DENIED_MESSAGE = 'Permita o uso do microfone para adicionar por voz.';

export const useSpeechCapture = (onFinalTranscript: (transcript: string) => void) => {
  const ownsRecognition = useRef(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  const release = () => {
    ownsRecognition.current = false;
    setListening(false);
  };

  useOwnedSpeechEvents(ownsRecognition, {
    onEnd: release,
    onError: (code) => {
      setError(describeSpeechError(code));
      release();
    },
    onResult: (event) => {
      const text = event.results[0]?.transcript ?? '';
      setTranscript(text);
      if (event.isFinal && text) onFinalTranscript(text);
    },
  });

  const start = async () => {
    setError(null);
    setTranscript('');
    ownsRecognition.current = await startSpeechRecognition();
    setListening(ownsRecognition.current);
    if (!ownsRecognition.current) setError(PERMISSION_DENIED_MESSAGE);
  };

  return { listening, transcript, error, start, stop: stopSpeechRecognition };
};
