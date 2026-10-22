const pad = (value: number): string => String(value).padStart(2, '0');

const formatDate = (date: Date): string =>
  `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;

export const describeLastUse = (lastUsedAt: string | null): string =>
  lastUsedAt ? `Último uso em ${formatDate(new Date(lastUsedAt))}` : 'Nunca usado';
