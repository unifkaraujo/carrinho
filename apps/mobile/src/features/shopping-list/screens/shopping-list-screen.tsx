import { router } from 'expo-router';
import { KeyboardAvoidingView, RefreshControl, SectionList, StyleSheet } from 'react-native';
import { CaptureBar } from '../../quick-capture/components/capture-bar';
import { confirm } from '../../../shared/ui/confirm';
import { OfflineBanner } from '../../../shared/ui/offline-banner';
import { Screen } from '../../../shared/ui/screen';
import { colors, spacing } from '../../../shared/ui/theme';
import { ItemRow } from '../components/item-row';
import { ListEmptyState } from '../components/list-empty-state';
import { ListHeader } from '../components/list-header';
import { SectionHeader } from '../components/section-header';
import type { Item } from '../domain/item';
import type { ListSection } from '../domain/list-section';
import { useItemActions } from '../hooks/use-item-actions';
import { useListSections } from '../hooks/use-list-sections';

const openItem = (item: Item) => router.push({ pathname: '/item/[id]', params: { id: item.id } });

export const ShoppingListScreen = () => {
  const { items, sections, pendingCount, boughtCount, refetch } = useListSections();
  const actions = useItemActions();

  const clearAction = {
    label: 'Limpar',
    onPress: () =>
      confirm({
        title: 'Limpar comprados',
        message: 'Remover todos os itens comprados da lista?',
        confirmLabel: 'Limpar',
        onConfirm: actions.clearBought,
      }),
  };

  return (
    <Screen>
      <OfflineBanner />
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.content}
          stickySectionHeadersEnabled={false}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={<ListHeader pendingCount={pendingCount} boughtCount={boughtCount} />}
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
              onPress={openItem}
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
        <CaptureBar />
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { paddingHorizontal: spacing.md + 4, paddingTop: spacing.md, paddingBottom: spacing.xl },
});
