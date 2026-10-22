const ABBREVIATED_UNITS: ReadonlySet<string> = new Set(['kg', 'g', 'l', 'ml']);

interface ItemAmount {
  quantity: number;
  unit: string | null;
}

const formatQuantity = (quantity: number): string =>
  String(Number(quantity.toFixed(3))).replace('.', ',');

const pluralizeUnit = (unit: string, quantity: number): string =>
  quantity > 1 && !ABBREVIATED_UNITS.has(unit) ? `${unit}s` : unit;

export const formatItemAmount = ({ quantity, unit }: ItemAmount): string =>
  unit ? `${formatQuantity(quantity)} ${pluralizeUnit(unit, quantity)}` : formatQuantity(quantity);

export const hasRelevantAmount = ({ quantity, unit }: ItemAmount): boolean =>
  quantity !== 1 || unit !== null;
