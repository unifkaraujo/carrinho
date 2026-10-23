'use no memo';

import { FlexWidget, TextWidget } from 'react-native-android-widget';
import { colors } from '../../../shared/ui/theme';
import { buildCaptureUri, type CaptureMode } from '../domain/capture-links';

interface QuickCaptureWidgetProps {
  pendingCount: number | null;
}

const describePending = (count: number | null): string => {
  if (count === null) return 'Lista de compras';
  if (count === 0) return 'Nada pendente';
  return count === 1 ? '1 pendente' : `${count} pendentes`;
};

const CaptureButton = ({ label, mode }: { label: string; mode: CaptureMode }) => (
  <FlexWidget
    clickAction="OPEN_URI"
    clickActionData={{ uri: buildCaptureUri(mode, 'widget') }}
    accessibilityLabel={label}
    style={{
      backgroundColor: colors.primary,
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      marginLeft: 8,
    }}
  >
    <TextWidget text={label} style={{ color: colors.onPrimary, fontSize: 14, fontWeight: '700' }} />
  </FlexWidget>
);

export const QuickCaptureWidget = ({ pendingCount }: QuickCaptureWidgetProps) => (
  <FlexWidget
    clickAction="OPEN_APP"
    accessibilityLabel="Abrir lista de compras"
    style={{
      height: 'match_parent',
      width: 'match_parent',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      borderRadius: 24,
      paddingHorizontal: 16,
    }}
  >
    <FlexWidget style={{ flex: 1 }}>
      <TextWidget
        text="Meu Mercado"
        style={{ color: colors.text, fontSize: 15, fontWeight: '700' }}
      />
      <TextWidget
        text={describePending(pendingCount)}
        style={{ color: colors.muted, fontSize: 12 }}
      />
    </FlexWidget>
    <CaptureButton label="🎤 Falar" mode="voice" />
    <CaptureButton label="✏️ Digitar" mode="text" />
  </FlexWidget>
);
