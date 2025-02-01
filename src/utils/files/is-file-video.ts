import { getFileExtension } from './get-file-extension';

const VIDEO_TYPES: string[] = [
  'video/avi',
  'video/H264',
  'video/H265',
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
];
const VIDEO_EXT: string[] = ['avi', 'm2v', 'mp4', 'mpg4', 'm4v', 'mpg', 'mpeg', 'wma', 'mov', 'ogv', 'webm', 'mkv'];

export function isFileVideo(type: string, fullName?: string): boolean {
  const ext = getFileExtension(fullName);
  return type ? VIDEO_TYPES.includes(type) : ext ? VIDEO_EXT.includes(ext) : false;
}
