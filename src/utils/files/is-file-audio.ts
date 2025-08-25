import { getFileExtension } from './get-file-extension';

const AUDIO_TYPES: string[] = [
  'audio/basic',
  'audio/mp4',
  'audio/aac',
  'audio/adpcm',
  'audio/amr',
  'audio/mpeg',
  'audio/ogg',
  'audio/vorbis',
  'audio/x-ms-wma',
  'audio/x-ms-wax',
  'audio/vnd.dra',
  'audio/vnd.dts',
  'audio/vnd.dts.hd',
  'audio/vnd.digital-winds',
  'audio/midi',
  'audio/mobile-xmf',
  'audio/vnd.rip',
  'audio/x-realaudio',
  'audio/x-pn-realaudio',
  'audio/x-mpegurl',
  'audio/vnd.rn-realaudio',
  'audio/vnd.wave',
  'audio/webm',
  'audio/flac',
  'audio/amr',
  'audio/3gpp',
  'audio/3gpp2',
  'audio/x-aac',
  'audio/x-aiff',
  'audio/x-caf',
  'audio/x-matroska',
  'audio/x-flac',
  'audio/x-wav',
  'audio/x-ape',
  'audio/x-m4a',
  'audio/x-ogg',
  'audio/opus',
  'audio/s3m',
  'audio/vnd.dece.audio',
  'audio/x-ms-wax',
  'audio/x-ms-wma',
  'audio/xm',
];
const AUDIO_EXT: string[] = ['au', 'aac', 'adp', 'adts', 'aif', 'aifc', 'aiff', 'amr', 'caf', 'dra', 'dts', 'dtshd', 'eol', 'flac', 'kar', 'm2a', 'm3a', 'm3u', 'mp3', 'm4a', 'mid', 'midi', 'mka', 'mp2', 'mp2a', 'mp4a', 'mpga', 'msmf', 'oga', 'ogg', 'opus', 'ra', 'ram', 'rip', 'rmi', 's3m', 'snd', 'spx', 'uva', 'uvva', 'wav', 'wax', 'weba', 'wma', 'xm'];

export function isFileAudio({ type, fullName }: { type?: string; fullName?: string }): boolean {
  const ext = getFileExtension(fullName);
  return type ? AUDIO_TYPES.includes(type) : ext ? AUDIO_EXT.includes(ext) : false;
}
