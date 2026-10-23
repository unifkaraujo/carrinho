import type { WidgetTaskHandler } from 'react-native-android-widget';
import { QuickCaptureWidget } from './quick-capture-widget';

const RENDER_ACTIONS = new Set(['WIDGET_ADDED', 'WIDGET_UPDATE', 'WIDGET_RESIZED']);

export const widgetTaskHandler: WidgetTaskHandler = async ({ widgetAction, renderWidget }) => {
  if (RENDER_ACTIONS.has(widgetAction)) renderWidget(<QuickCaptureWidget />);
};
