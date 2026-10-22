export const ITEM_MUTATION_KEYS = {
  update: ['items', 'update'],
  remove: ['items', 'remove'],
  clearBought: ['items', 'clear-bought'],
} as const;

export const ITEM_MUTATION_SCOPE = { id: 'items' } as const;
