export function resolveAssetUri(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  return domain ? 'https://' + domain + path : path;
}

export function compactText(value: string, maxLength = 150): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > maxLength ? normalized.slice(0, maxLength - 1) + '…' : normalized;
}