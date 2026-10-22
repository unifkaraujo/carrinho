export const splitWords = (text: string): string[] => text.trim().split(/\s+/).filter(Boolean);
