import { requestWidgetUpdate } from 'react-native-android-widget';
import { QuickCaptureWidget } from './quick-capture-widget';
import { QUICK_CAPTURE_WIDGET_NAME } from './quick-capture-widget-name';

export const updateQuickCaptureWidget = (pendingCount: number): Promise<void> =>
  requestWidgetUpdate({
    widgetName: QUICK_CAPTURE_WIDGET_NAME,
    renderWidget: () => <QuickCaptureWidget pendingCount={pendingCount} />,
  }).catch(() => undefined);
