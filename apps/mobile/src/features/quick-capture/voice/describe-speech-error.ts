import type { ExpoSpeechRecognitionErrorCode } from 'expo-speech-recognition';

const MESSAGES: Partial<Record<ExpoSpeechRecognitionErrorCode, string | null>> = {
  aborted: null,
  'no-speech': 'Não ouvi nada. Toque no microfone e fale de novo.',
  'speech-timeout': 'Não ouvi nada. Toque no microfone e fale de novo.',
  'not-allowed': 'Permita o uso do microfone para adicionar por voz.',
  network: 'Sem internet para reconhecer a voz.',
  'language-not-supported': 'Reconhecimento em português indisponível neste aparelho.',
  'service-not-allowed': 'Reconhecimento de voz indisponível neste aparelho.',
};

const FALLBACK_MESSAGE = 'Não foi possível reconhecer a voz.';

export const describeSpeechError = (code: ExpoSpeechRecognitionErrorCode): string | null =>
  code in MESSAGES ? (MESSAGES[code] ?? null) : FALLBACK_MESSAGE;
