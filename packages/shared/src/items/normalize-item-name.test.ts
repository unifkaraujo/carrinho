import { describe, expect, it } from 'vitest';
import { normalizeItemName } from './normalize-item-name';

describe('normalizeItemName', () => {
  it.each([
    ['ovos', 'ovo'],
    ['Ovos', 'ovo'],
    ['  OVO  ', 'ovo'],
    ['Pães', 'pao'],
    ['pão', 'pao'],
    ['limões', 'limao'],
    ['pastéis', 'pastel'],
    ['flores', 'flor'],
    ['colheres', 'colher'],
    ['açúcares', 'acucar'],
    ['nozes', 'noz'],
    ['bombons', 'bombom'],
    ['pudins', 'pudim'],
    ['kiwis', 'kiwi'],
    ['maçãs', 'maca'],
    ['grãos', 'grao'],
    ['doces', 'doce'],
  ])('normaliza "%s" para "%s"', (input, expected) => {
    expect(normalizeItemName(input)).toBe(expected);
  });

  it('singulariza cada palavra de nomes compostos', () => {
    expect(normalizeItemName('Pães de queijo')).toBe('pao de queijo');
  });

  it('colapsa espaços e remove pontuação', () => {
    expect(normalizeItemName('papel   higiênico.')).toBe('papel higienico');
  });

  it('preserva palavras invariáveis', () => {
    expect(normalizeItemName('lápis')).toBe('lapis');
    expect(normalizeItemName('gás')).toBe('gas');
  });

  it('trata singular e plural como o mesmo item', () => {
    expect(normalizeItemName('Ovos')).toBe(normalizeItemName('ovo'));
    expect(normalizeItemName('Limões')).toBe(normalizeItemName('limao'));
  });
});
