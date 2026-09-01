import { Image, type ImageProps } from 'expo-image';
import { resolveAssetUri } from '@/lib/content';

export function RemoteImage({
  path,
  style,
  ...props
}: { path: string | null | undefined } & Omit<ImageProps, 'source'>) {
  const uri = resolveAssetUri(path);
  return <Image source={uri ? { uri } : undefined} style={style} contentFit="cover" transition={180} {...props} />;
}