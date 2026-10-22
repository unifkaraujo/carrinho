import { INVARIABLE_WORDS } from './invariable-words';
import { PLURAL_RULES } from './plural-rules';

const MIN_PLURAL_LENGTH = 4;

const isSingularizable = (word: string): boolean =>
  word.length >= MIN_PLURAL_LENGTH && !INVARIABLE_WORDS.has(word);

export const singularizeWord = (word: string): string => {
  if (!isSingularizable(word)) return word;
  const rule = PLURAL_RULES.find(([pattern]) => pattern.test(word));
  return rule ? word.replace(rule[0], rule[1]) : word;
};
