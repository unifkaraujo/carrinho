'use no memo';

import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { colors } from '../../../shared/ui/theme';
import { buildCaptureUri } from '../domain/capture-links';

export const QuickCaptureWidget = () => (
  <FlexWidget
    clickAction="OPEN_URI"
    clickActionData={{ uri: buildCaptureUri('voice', 'widget') }}
    accessibilityLabel="Comprar: adicionar item por voz"
    style={{
      height: 'match_parent',
      width: 'match_parent',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
      borderRadius: 24,
    }}
  >
    <TextWidget text="🎤" style={{ fontSize: 24 }} />
    <TextWidget
      text="Comprar"
      style={{ color: colors.onPrimary, fontSize: 13, fontWeight: '700', marginTop: 2 }}
    />
  </FlexWidget>
);
