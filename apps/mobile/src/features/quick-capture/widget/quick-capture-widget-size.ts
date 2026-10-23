export type QuickCaptureWidgetSize = 'wide' | 'large';

const LARGE_WIDGET_NAME = 'QuickCaptureLarge';

export const resolveWidgetSize = (widgetName: string): QuickCaptureWidgetSize =>
  widgetName === LARGE_WIDGET_NAME ? 'large' : 'wide';
