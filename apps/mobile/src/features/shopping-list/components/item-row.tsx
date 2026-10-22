import Ionicons from '@expo/vector-icons/Ionicons';
import { formatItemAmount, hasRelevantAmount } from '@meu-mercado/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, spacing } from '../../../shared/ui/theme';
import type { Item } from '../domain/item';
import { isLocalItem } from '../domain/local-item';

interface ItemRowProps {
  item: Item;
  onToggle: (item: Item) => void;
  onRemove: (item: Item) => void;
  onPress: (item: Item) => void;
}

export const ItemRow = ({ item, onToggle, onRemove, onPress }: ItemRowProps) => {
  const bought = item.status === 'bought';
  const syncing = isLocalItem(item);
  return (
    <View style={[styles.row, syncing && styles.syncing]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: bought }}
        accessibilityLabel={`Marcar ${item.name}`}
        onPress={() => onToggle(item)}
        hitSlop={spacing.sm}
      >
        <Ionicons
          name={bought ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={bought ? colors.primary : colors.muted}
        />
      </Pressable>
      <Pressable style={styles.content} onPress={() => onPress(item)}>
        <Text style={[styles.name, bought && styles.boughtName]}>{item.name}</Text>
        {hasRelevantAmount(item) ? (
          <Text style={styles.amount}>{formatItemAmount(item)}</Text>
        ) : null}
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${item.name}`}
        onPress={() => onRemove(item)}
        hitSlop={spacing.sm}
      >
        <Ionicons name="trash-outline" size={20} color={colors.muted} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + spacing.xs,
    marginBottom: spacing.sm,
  },
  syncing: { opacity: 0.5, pointerEvents: 'none' },
  content: { flex: 1, gap: 2 },
  name: { fontSize: fontSize.md, color: colors.text },
  boughtName: { color: colors.muted, textDecorationLine: 'line-through' },
  amount: { fontSize: fontSize.sm, color: colors.muted },
});
