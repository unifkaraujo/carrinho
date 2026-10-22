import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

const LANGUAGE = 'pt-BR';

export const startSpeechRecognition = async (): Promise<boolean> => {
  const permission = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
  if (!permission.granted) return false;
  ExpoSpeechRecognitionModule.start({ lang: LANGUAGE, interimResults: true, continuous: false });
  return true;
};

export const stopSpeechRecognition = (): void => ExpoSpeechRecognitionModule.stop();
