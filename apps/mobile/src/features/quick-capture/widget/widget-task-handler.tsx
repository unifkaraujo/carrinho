import type { WidgetTaskHandler } from 'react-native-android-widget';
import { QuickCaptureWidget } from './quick-capture-widget';
import { resolveWidgetSize } from './quick-capture-widget-size';

const RENDER_ACTIONS = new Set(['WIDGET_ADDED', 'WIDGET_UPDATE', 'WIDGET_RESIZED']);

export const widgetTaskHandler: WidgetTaskHandler = async ({
  widgetAction,
  widgetInfo,
  renderWidget,
}) => {
  if (!RENDER_ACTIONS.has(widgetAction)) return;
  renderWidget(<QuickCaptureWidget size={resolveWidgetSize(widgetInfo.widgetName)} />);
};
