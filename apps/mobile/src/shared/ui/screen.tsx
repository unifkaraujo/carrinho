import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from './theme';

interface ScreenProps {
  children: ReactNode;
}

export const Screen = ({ children }: ScreenProps) => (
  <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
});
