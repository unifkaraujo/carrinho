import { toSearchForm } from '../text/to-search-form';
import { NUMBER_WORDS } from './number-words';

const NUMERIC_PATTERN = /^\d+([.,]\d+)?$/;

const parseNumeric = (token: string): number => Number(token.replace(',', '.'));

const toPositiveOrNull = (value: number | undefined): number | null =>
  value !== undefined && value > 0 ? value : null;

export const parseQuantity = (token: string): number | null =>
  NUMERIC_PATTERN.test(token)
    ? toPositiveOrNull(parseNumeric(token))
    : toPositiveOrNull(NUMBER_WORDS[toSearchForm(token)]);
