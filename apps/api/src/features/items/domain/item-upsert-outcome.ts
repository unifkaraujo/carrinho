export type ItemMergeOutcome = 'reactivated' | 'updated' | 'unchanged';

export type ItemUpsertOutcome = 'created' | ItemMergeOutcome;
