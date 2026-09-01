export function resolveBaseUrl(value: string | null | undefined): string | undefined {
  const normalized = value?.trim().replace(/\/+$/, '');
  if (!normalized) return undefined;
  return /^https?:\/\//i.test(normalized) ? normalized : 'https://' + normalized;
}

export function resolveAssetUri(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const domain = resolveBaseUrl(process.env.EXPO_PUBLIC_DOMAIN);
  return domain ? domain + path : path;
}

export function compactText(value: string, maxLength = 150): string {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length > maxLength ? normalized.slice(0, maxLength - 1) + '…' : normalized;
}