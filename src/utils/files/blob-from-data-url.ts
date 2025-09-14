import { b64ToBlob } from './b64-to-blob';

export function blobFromDataURL(dataURL: string): Blob {
  const b64Start = dataURL.indexOf(';base64,');
  if (b64Start < 8) {
    throw new Error(`Fail to parse given string as data url`);
  }
  const mimeType = dataURL.substring(5, b64Start);
  return b64ToBlob(dataURL.substring(b64Start + 8), mimeType);
}
