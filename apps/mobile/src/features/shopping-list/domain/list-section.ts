import type { Item } from './item';

export type ListSectionKind = 'pending' | 'bought';

export interface ListSection {
  key: string;
  title: string;
  kind: ListSectionKind;
  data: Item[];
}
