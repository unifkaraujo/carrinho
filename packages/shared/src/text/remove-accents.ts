export const removeAccents = (text: string): string =>
  text.normalize('NFD').replace(/\p{Diacritic}/gu, '');
