import { describe, expect, it } from 'vitest';
import { buildItem } from '../../items/testing/build-item';
import { buildCaptureMessage } from './build-capture-message';

describe('buildCaptureMessage', () => {
  it.each([
    ['created', 'Adicionado: Ovos'],
    ['updated', 'Atualizado: Ovos (2 dúzias)'],
    ['reactivated', 'De volta à lista: Ovos'],
    ['unchanged', 'Já está na lista: Ovos'],
  ] as const)('monta a mensagem para %s', (outcome, expected) => {
    const item = buildItem({ quantity: 2, unit: 'dúzia' });
    expect(buildCaptureMessage({ item, outcome })).toBe(expected);
  });
});
