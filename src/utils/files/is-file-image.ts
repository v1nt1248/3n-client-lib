import { getFileExtension } from './get-file-extension';

const IMAGE_TYPES: string[] = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/tiff',
  'image/webp',
  'image/heif',
  'image/heic',
  'image/avif',
  'image/svg+xml',
];
const IMAGE_EXT: string[] = ['jpeg', 'jpg', 'png', 'gif', 'tiff', 'webp', 'heif', 'heic', 'avif', 'svg'];

export function isFileImage(type: string, fullName?: string): boolean {
  const ext = getFileExtension(fullName);
  return type ? IMAGE_TYPES.includes(type) : ext ? IMAGE_EXT.includes(ext) : false;
}
