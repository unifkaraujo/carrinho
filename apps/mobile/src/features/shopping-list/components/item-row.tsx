import Ionicons from '@expo/vector-icons/Ionicons';
import { formatItemAmount, hasRelevantAmount } from '@meu-mercado/shared';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSize, radius, shadow, spacing } from '../../../shared/ui/theme';
import { displayItemName } from '../domain/display-item-name';
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
    <View style={[styles.row, bought && styles.rowBought, syncing && styles.syncing]}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: bought }}
        accessibilityLabel={`Marcar ${item.name}`}
        onPress={() => onToggle(item)}
        hitSlop={spacing.sm}
        style={[styles.check, bought && styles.checkOn]}
      >
        {bought ? <Ionicons name="checkmark" size={18} color={colors.onPrimary} /> : null}
      </Pressable>
      <Pressable style={styles.content} onPress={() => onPress(item)}>
        <Text style={[styles.name, bought && styles.boughtName]} numberOfLines={2}>
          {displayItemName(item.name)}
        </Text>
      </Pressable>
      {hasRelevantAmount(item) ? (
        <View style={[styles.amount, bought && styles.amountBought]}>
          <Text style={[styles.amountText, bought && styles.amountTextBought]}>
            {formatItemAmount(item)}
          </Text>
        </View>
      ) : null}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Remover ${item.name}`}
        onPress={() => onRemove(item)}
        hitSlop={spacing.sm}
      >
        <Ionicons name="close" size={20} color={colors.muted} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    ...shadow,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md - 4,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    minHeight: 60,
    marginBottom: spacing.sm,
  },
  rowBought: { backgroundColor: colors.surfaceMuted, shadowOpacity: 0, elevation: 0 },
  syncing: { opacity: 0.5, pointerEvents: 'none' },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.primary },
  content: { flex: 1, paddingVertical: spacing.md - 2 },
  name: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  boughtName: { color: colors.muted, fontWeight: '400', textDecorationLine: 'line-through' },
  amount: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
  },
  amountBought: { backgroundColor: colors.border },
  amountText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primaryPressed },
  amountTextBought: { color: colors.muted },
});
