import { toSearchForm } from '../text/to-search-form';
import { COMMAND_WORDS } from './command-words';
import { CONNECTOR_WORDS } from './connector-words';
import type { ParsedCapture } from './parsed-capture';
import { parseQuantity } from './parse-quantity';
import { parseUnit } from './parse-unit';
import { takeLeadingToken, type TakenToken } from './take-leading-token';
import { tokenizeCaptureText } from './tokenize-capture-text';

const matchesSet =
  (set: ReadonlySet<string>) =>
  (token: string): true | null =>
    set.has(toSearchForm(token)) ? true : null;

const dropCommandWord = (tokens: string[]): string[] =>
  takeLeadingToken(tokens, matchesSet(COMMAND_WORDS)).rest;

const takeUnitAfterQuantity = (tokens: string[], hasQuantity: boolean): TakenToken<string> =>
  hasQuantity ? takeLeadingToken(tokens, parseUnit) : { value: null, rest: tokens };

const dropConnectorAfterUnit = (tokens: string[], hasUnit: boolean): string[] =>
  hasUnit ? takeLeadingToken(tokens, matchesSet(CONNECTOR_WORDS)).rest : tokens;

export const parseCaptureText = (text: string): ParsedCapture | null => {
  const quantity = takeLeadingToken(dropCommandWord(tokenizeCaptureText(text)), parseQuantity);
  const unit = takeUnitAfterQuantity(quantity.rest, quantity.value !== null);
  const nameTokens = dropConnectorAfterUnit(unit.rest, unit.value !== null);
  if (nameTokens.length === 0) return null;
  return {
    name: nameTokens.join(' '),
    quantity: quantity.value,
    unit: unit.value,
  };
};
