import { useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useRef, useState } from 'react';
import { describeSpeechError } from './describe-speech-error';
import { startSpeechRecognition, stopSpeechRecognition } from './start-speech-recognition';

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

  useSpeechRecognitionEvent('end', () => {
    if (ownsRecognition.current) release();
  });
  useSpeechRecognitionEvent('error', (event) => {
    if (!ownsRecognition.current) return;
    setError(describeSpeechError(event.error));
    release();
  });
  useSpeechRecognitionEvent('result', (event) => {
    if (!ownsRecognition.current) return;
    const text = event.results[0]?.transcript ?? '';
    setTranscript(text);
    if (event.isFinal && text) onFinalTranscript(text);
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
