import type { Item } from '../../shopping-list/domain/item';

export type CaptureOutcome = 'created' | 'updated' | 'reactivated' | 'unchanged';

export interface CaptureResult {
  item: Item;
  outcome: CaptureOutcome;
  message: string;
}
