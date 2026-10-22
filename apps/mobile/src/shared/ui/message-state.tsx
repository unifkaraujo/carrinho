import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, spacing } from './theme';

interface MessageStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const MessageState = ({ title, description, actionLabel, onAction }: MessageStateProps) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
    {actionLabel && onAction ? (
      <Pressable accessibilityRole="button" onPress={onAction} hitSlop={spacing.sm}>
        <Text style={styles.action}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl * 2 },
  title: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text, textAlign: 'center' },
  description: { fontSize: fontSize.md, color: colors.muted, textAlign: 'center' },
  action: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary },
});
