export const colors = {
  background: '#F2F6EE',
  surface: '#FFFFFF',
  surfaceMuted: '#E7EFE2',
  text: '#14231A',
  muted: '#64736A',
  border: '#DCE5D6',
  primary: '#1F9D55',
  primaryPressed: '#17844A',
  primarySoft: '#DCF2E3',
  onPrimary: '#FFFFFF',
  danger: '#D64545',
  dangerSoft: '#FBE6E6',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radius = {
  sm: 12,
  md: 16,
  lg: 24,
  pill: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 13,
  md: 16,
  lg: 20,
  xl: 30,
} as const;

export const shadow = {
  shadowColor: '#1B3A26',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
} as const;
