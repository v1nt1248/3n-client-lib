import { getFileExtension } from './get-file-extension';

const VIDEO_TYPES: string[] = [
  'video/3gpp2',
  'video/3gpp',
  'video/x-ms-asf',
  'video/avi',
  'video/h265',
  'video/mp4',
  'video/x-m4v',
  'video/x-ms-wmv',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/quicktime',
  'video/ogg',
  'video/x-matroska',
  'video/x-msvideo',
  'video/x-f4v',
  'video/x-fli',
  'video/x-flv',
  'video/vnd.fvt',
  'video/h261',
  'video/h263',
  'video/h264',
  'video/jpm',
  'video/jpeg',
  'video/iso.segment',
  'video/vnd.mpegurl',
  'video/x-m4v',
  'video/mj2',
  'video/quicktime',
  'video/x-sgi-movie',
  'video/vnd.mpegurl',
  'video/x-smv',
  'video/vnd.dece.hd',
  'video/vnd.dece.mobile',
  'video/vnd.dece.pd',
  'video/vnd.dece.sd',
  'video/vnd.uvvu.mp4',
  'video/vnd.dece.video',
  'video/vnd.vivo',
  'video/x-ms-vob',
  'video/x-ms-wm',
  'video/x-ms-wmv',
  'video/x-ms-wmx',
  'video/x-ms-wvx',
];
const VIDEO_EXT: string[] = ['3g2', '3gp', '3gpp', 'asf', 'asx', 'avi', 'f4v', 'fli', 'flv', 'fvt', 'h261', 'h263', 'h264', 'jpgm', 'jpgv', 'jpm', 'm1v', 'm2v', 'm4s', 'm4u', 'mj2', 'mjp2', 'mk3d', 'mks', 'mkv', 'mp4', 'mp4v', 'mpg4', 'm4v', 'mpg', 'mpg4', 'mpe', 'mpeg', 'mxu', 'qt', 'smv', 'uvh', 'uvm', 'uvp', 'uvs', 'uvu', 'uvv', 'uvvh', 'uvvm', 'uvvp', 'uvvs', 'uvvu', 'uvvv', 'viv', 'vob', 'wmv', 'wm', 'wmv', 'wmx', 'wvx', 'mov', 'movie', 'ogv', 'webm', 'mkv'];

export function isFileVideo({ type, fullName }: { type?: string; fullName?: string }): boolean {
  const ext = getFileExtension(fullName);
  return type ? VIDEO_TYPES.includes(type) : ext ? VIDEO_EXT.includes(ext) : false;
}
