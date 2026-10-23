import { router, useLocalSearchParams } from 'expo-router';
import { confirm } from '../../../shared/ui/confirm';
import { MessageState } from '../../../shared/ui/message-state';
import { ScrollScreen } from '../../../shared/ui/scroll-screen';
import { ItemForm } from '../components/item-form';
import type { Item } from '../domain/item';
import type { ItemPatch } from '../domain/item-patch';
import { isLocalItem } from '../domain/local-item';
import { useItem } from '../hooks/use-item';
import { useItemActions } from '../hooks/use-item-actions';

const EditableItem = ({ item }: { item: Item }) => {
  const actions = useItemActions();

  const save = (patch: ItemPatch) => {
    actions.update({ id: item.id, patch });
    router.back();
  };

  const remove = () =>
    confirm({
      title: 'Remover item',
      message: `Remover "${item.name}" da lista?`,
      confirmLabel: 'Remover',
      onConfirm: () => {
        actions.remove(item);
        router.back();
      },
    });

  return <ItemForm item={item} onSubmit={save} onRemove={remove} />;
};

export const EditItemScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: item } = useItem(id);

  if (!item) return <MessageState icon="search-outline" title="Item não encontrado" />;
  return (
    <ScrollScreen>
      {isLocalItem(item) ? (
        <MessageState
          icon="sync-outline"
          title="Sincronizando…"
          description="Este item ainda está sendo salvo. Tente editar em instantes."
        />
      ) : (
        <EditableItem item={item} />
      )}
    </ScrollScreen>
  );
};
