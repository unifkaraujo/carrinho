import { singularizeWord } from '../items/singularize-word';
import { toSearchForm } from '../text/to-search-form';
import { UNIT_ALIASES } from './unit-aliases';

export const parseUnit = (token: string): string | null =>
  UNIT_ALIASES[singularizeWord(toSearchForm(token))] ?? null;
