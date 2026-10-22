const BEARER_PATTERN = /^Bearer\s+(\S+)$/i;

export const readBearerToken = (header: string | undefined): string | null =>
  header?.match(BEARER_PATTERN)?.[1] ?? null;
