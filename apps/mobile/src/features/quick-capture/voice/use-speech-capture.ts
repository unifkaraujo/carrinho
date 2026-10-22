import { useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useState } from 'react';
import { describeSpeechError } from './describe-speech-error';
import { startSpeechRecognition, stopSpeechRecognition } from './start-speech-recognition';

const PERMISSION_DENIED_MESSAGE = 'Permita o uso do microfone para adicionar por voz.';

export const useSpeechCapture = (onFinalTranscript: (transcript: string) => void) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useSpeechRecognitionEvent('start', () => setListening(true));
  useSpeechRecognitionEvent('end', () => setListening(false));
  useSpeechRecognitionEvent('error', (event) => setError(describeSpeechError(event.error)));
  useSpeechRecognitionEvent('result', (event) => {
    const text = event.results[0]?.transcript ?? '';
    setTranscript(text);
    if (event.isFinal && text) onFinalTranscript(text);
  });

  const start = async () => {
    setError(null);
    setTranscript('');
    if (!(await startSpeechRecognition())) setError(PERMISSION_DENIED_MESSAGE);
  };

  return { listening, transcript, error, start, stop: stopSpeechRecognition };
};
