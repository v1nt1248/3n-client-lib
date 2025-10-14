import { getFileExtension } from './get-file-extension';

const ARCHIVES_TYPES: string[] = [
  'application/x-archive',
  'application/x-iso9660-image',
  'application/x-tar',
  'application/x-brotli',
  'application/x-bzip2',
  'application/vnd.genozip',
  'application/gzip',
  'application/x-lzip',
  'application/x-lzma',
  'application/x-lzop',
  'application/x-snappy-framed',
  'application/x-xz',
  'application/x-7z-compressed',
  'application/octet-stream',
  'application/x-ace-compressed',
  'application/x-alz-compressed',
  'application/vnd.android.package-archive',
  'application/octet-stream',
  'application/x-freearc',
  'application/x-arj',
  'application/x-b1',
  'application/vnd.ms-cab-compressed',
  'application/x-cfs-compressed',
  'application/x-dar',
  'application/x-apple-diskimage',
  'application/java-archive',
  'application/x-lzh',
  'application/x-lzx',
  'application/x-rar-compressed',
  'application/x-gtar',
  'application/x-xar',
  'application/zip',
  'application/x-zoo',
];
const ARCHIVES_EXT: string[] = ['a', 'ar', 'iso', 'tar', 'br', 'bz2', 'genozip', 'gzip', 'lz', 'lzma', 'lzo', 'sz', 'xz', '7z', 's7z', 'aar', 'ace', 'alz', 'apk', 'arc', 'ark', 'cdx', 'arj', 'b1', 'cab', 'car', 'cfs', 'xdar', 'dmg', 'ice', 'jar', 'lzh', 'lha', 'lzx', 'pea', 'rar', 'tgz', 'txz', 'war', 'xar', 'zip', 'zipx', 'zoo', 'zz'];

export function isFileArchive({ type, fullName }: { type?: string; fullName?: string }): boolean {
  const ext = getFileExtension(fullName);
  return type ? ARCHIVES_TYPES.includes(type) : ext ? ARCHIVES_EXT.includes(ext) : false;
}
