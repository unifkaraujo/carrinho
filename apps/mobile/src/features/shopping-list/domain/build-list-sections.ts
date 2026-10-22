import type { Category } from '../../categories/domain/category';
import type { Item } from './item';
import type { ListSection } from './list-section';

const UNCATEGORIZED_KEY = 'uncategorized';
const UNCATEGORIZED_TITLE = 'Sem categoria';
const BOUGHT_KEY = 'bought';
const BOUGHT_TITLE = 'Comprados';

const byName = (a: Item, b: Item) => a.name.localeCompare(b.name, 'pt-BR');
const byMostRecentlyBought = (a: Item, b: Item) =>
  (b.boughtAt ?? '').localeCompare(a.boughtAt ?? '');

const pendingSection = (key: string, title: string, items: Item[]): ListSection => ({
  key,
  title,
  kind: 'pending',
  data: [...items].sort(byName),
});

const pendingSections = (pending: Item[], categories: Category[]): ListSection[] => {
  const knownIds = new Set(categories.map((category) => category.id));
  const uncategorized = pending.filter(
    (item) => !item.categoryId || !knownIds.has(item.categoryId),
  );
  return [
    pendingSection(UNCATEGORIZED_KEY, UNCATEGORIZED_TITLE, uncategorized),
    ...categories.map((category) =>
      pendingSection(
        category.id,
        category.name,
        pending.filter((item) => item.categoryId === category.id),
      ),
    ),
  ].filter((section) => section.data.length > 0);
};

const boughtSection = (bought: Item[]): ListSection[] =>
  bought.length === 0
    ? []
    : [
        {
          key: BOUGHT_KEY,
          title: BOUGHT_TITLE,
          kind: 'bought',
          data: [...bought].sort(byMostRecentlyBought),
        },
      ];

export const buildListSections = (items: Item[], categories: Category[]): ListSection[] => [
  ...pendingSections(
    items.filter((item) => item.status === 'pending'),
    categories,
  ),
  ...boughtSection(items.filter((item) => item.status === 'bought')),
];
