import { splitWords } from '../text/split-words';
import { toSearchForm } from '../text/to-search-form';
import { singularizeWord } from './singularize-word';

const stripPunctuation = (text: string): string => text.replace(/[^\p{L}\p{N}\s-]/gu, ' ');

export const normalizeItemName = (name: string): string =>
  splitWords(stripPunctuation(toSearchForm(name)))
    .map(singularizeWord)
    .join(' ');
