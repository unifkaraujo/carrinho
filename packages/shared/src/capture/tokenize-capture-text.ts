import { splitWords } from '../text/split-words';

const LIST_SUFFIX_PATTERN = /\s+(na|a|à|pra|para a)\s+lista(\s+de\s+compras)?\s*[.!]?$/i;
const NUMBER_GLUED_TO_WORD_PATTERN = /(\d)(\p{L})/gu;

const stripListSuffix = (text: string): string => text.replace(LIST_SUFFIX_PATTERN, '');

const separateGluedNumbers = (text: string): string =>
  text.replace(NUMBER_GLUED_TO_WORD_PATTERN, '$1 $2');

export const tokenizeCaptureText = (text: string): string[] =>
  splitWords(separateGluedNumbers(stripListSuffix(text.trim())));
