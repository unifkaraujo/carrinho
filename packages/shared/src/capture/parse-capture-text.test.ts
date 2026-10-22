import { describe, expect, it } from 'vitest';
import { parseCaptureText } from './parse-capture-text';

describe('parseCaptureText', () => {
  it('não define quantidade nem unidade quando só há o nome', () => {
    expect(parseCaptureText('ovos')).toEqual({ name: 'ovos', quantity: null, unit: null });
  });

  it('lê quantidade numérica', () => {
    expect(parseCaptureText('2 ovos')).toEqual({ name: 'ovos', quantity: 2, unit: null });
  });

  it('lê quantidade por extenso', () => {
    expect(parseCaptureText('três limões')).toEqual({ name: 'limões', quantity: 3, unit: null });
  });

  it('lê quantidade, unidade e remove o conector', () => {
    expect(parseCaptureText('2 dúzias de ovos')).toEqual({
      name: 'ovos',
      quantity: 2,
      unit: 'dúzia',
    });
  });

  it('lê "meia dúzia"', () => {
    expect(parseCaptureText('meia dúzia de ovos')).toEqual({
      name: 'ovos',
      quantity: 0.5,
      unit: 'dúzia',
    });
  });

  it('lê decimal com vírgula e unidade colada', () => {
    expect(parseCaptureText('1,5kg de carne moída')).toEqual({
      name: 'carne moída',
      quantity: 1.5,
      unit: 'kg',
    });
  });

  it('converte aliases de unidade', () => {
    expect(parseCaptureText('2 litros de leite')?.unit).toBe('l');
    expect(parseCaptureText('3 pacotes de café')?.unit).toBe('pacote');
  });

  it('remove o comando de voz no início', () => {
    expect(parseCaptureText('Adicionar ovos')).toEqual({
      name: 'ovos',
      quantity: null,
      unit: null,
    });
  });

  it('remove o sufixo "na lista"', () => {
    expect(parseCaptureText('adicionar 2 ovos na lista de compras')).toEqual({
      name: 'ovos',
      quantity: 2,
      unit: null,
    });
  });

  it('não interpreta unidade sem quantidade explícita', () => {
    expect(parseCaptureText('saco de lixo')).toEqual({
      name: 'saco de lixo',
      quantity: null,
      unit: null,
    });
  });

  it('não trata a palavra seguinte como unidade quando não é unidade', () => {
    expect(parseCaptureText('2 pães de queijo')).toEqual({
      name: 'pães de queijo',
      quantity: 2,
      unit: null,
    });
  });

  it.each(['', '   ', 'adicionar', '2', '2 kg'])('retorna null sem nome: "%s"', (input) => {
    expect(parseCaptureText(input)).toBeNull();
  });
});
