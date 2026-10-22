import * as QuickActions from 'expo-quick-actions';
import { buildCaptureHref } from '../domain/capture-links';

export const registerCaptureShortcuts = (): Promise<void> =>
  QuickActions.setItems([
    {
      id: 'capture-voice',
      title: 'Adicionar por voz',
      params: { href: buildCaptureHref('voice', 'shortcut') },
    },
    {
      id: 'capture-text',
      title: 'Digitar item',
      params: { href: buildCaptureHref('text', 'shortcut') },
    },
  ]).catch(() => undefined);
