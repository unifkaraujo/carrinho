import { RefreshControl, SectionList, StyleSheet } from 'react-native';
import { confirm } from '../../../shared/ui/confirm';
import { Screen } from '../../../shared/ui/screen';
import { colors, spacing } from '../../../shared/ui/theme';
import { ItemRow } from '../components/item-row';
import { ListEmptyState } from '../components/list-empty-state';
import { ListHeader } from '../components/list-header';
import { SectionHeader } from '../components/section-header';
import type { ListSection } from '../domain/list-section';
import { useItemActions } from '../hooks/use-item-actions';
import { useListSections } from '../hooks/use-list-sections';

export const ShoppingListScreen = () => {
  const { items, sections, pendingCount, refetch } = useListSections();
  const actions = useItemActions();

  const confirmClearBought = () =>
    confirm({
      title: 'Limpar comprados',
      message: 'Remover todos os itens comprados da lista?',
      confirmLabel: 'Limpar',
      onConfirm: actions.clearBought,
    });

  const clearAction = { label: 'Limpar', onPress: confirmClearBought };

  return (
    <Screen>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={<ListHeader pendingCount={pendingCount} />}
        ListEmptyComponent={
          <ListEmptyState isError={items.isError} isPending={items.isPending} onRetry={refetch} />
        }
        renderSectionHeader={({ section }: { section: ListSection }) => (
          <SectionHeader
            title={section.title}
            count={section.data.length}
            action={section.kind === 'bought' ? clearAction : undefined}
          />
        )}
        renderItem={({ item }) => (
          <ItemRow
            item={item}
            onToggle={actions.toggle}
            onRemove={actions.remove}
            onPress={actions.toggle}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={items.isRefetching}
            onRefresh={refetch}
            colors={[colors.primary]}
          />
        }
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  content: { padding: spacing.lg, paddingBottom: spacing.xl * 3 },
});
