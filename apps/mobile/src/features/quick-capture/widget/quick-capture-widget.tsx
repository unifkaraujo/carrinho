'use no memo';

import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { colors } from '../../../shared/ui/theme';
import { buildCaptureUri } from '../domain/capture-links';
import type { QuickCaptureWidgetSize } from './quick-capture-widget-size';

const LAYOUTS = {
  wide: { direction: 'row', iconSize: 26, labelSize: 18, gap: 10 },
  large: { direction: 'column', iconSize: 48, labelSize: 24, gap: 6 },
} as const;

export const QuickCaptureWidget = ({ size }: { size: QuickCaptureWidgetSize }) => {
  const layout = LAYOUTS[size];
  return (
    <FlexWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: buildCaptureUri('voice', 'widget') }}
      accessibilityLabel="Comprar: adicionar item por voz"
      style={{
        height: 'match_parent',
        width: 'match_parent',
        flexDirection: layout.direction,
        alignItems: 'center',
        justifyContent: 'center',
        flexGap: layout.gap,
        backgroundColor: colors.primary,
        borderRadius: 24,
      }}
    >
      <TextWidget text="🎤" style={{ fontSize: layout.iconSize }} />
      <TextWidget
        text="Comprar"
        style={{ color: colors.onPrimary, fontSize: layout.labelSize, fontWeight: '700' }}
      />
    </FlexWidget>
  );
};
