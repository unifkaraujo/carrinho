import { StyleSheet, View } from 'react-native';

interface ProgressBarProps {
  progress: number;
  trackColor: string;
  fillColor: string;
}

export const ProgressBar = ({ progress, trackColor, fillColor }: ProgressBarProps) => (
  <View
    accessibilityRole="progressbar"
    accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
    style={[styles.track, { backgroundColor: trackColor }]}
  >
    <View style={[styles.fill, { backgroundColor: fillColor, width: `${progress * 100}%` }]} />
  </View>
);

const styles = StyleSheet.create({
  track: { height: 8, borderRadius: 4, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 4 },
});
