import { describe, expect, it } from 'vitest';
import { buildCaptureHref, buildCaptureUri } from './capture-links';

describe('capture links', () => {
  it('monta a rota interna', () => {
    expect(buildCaptureHref('voice', 'widget')).toBe('/capture?mode=voice&source=widget');
  });

  it('monta o deep link com o scheme do app', () => {
    expect(buildCaptureUri('text', 'shortcut')).toBe(
      'meumercado://capture?mode=text&source=shortcut',
    );
  });
});
