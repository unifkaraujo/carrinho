import { removeAccents } from './remove-accents';

export const toSearchForm = (text: string): string => removeAccents(text.toLowerCase());
