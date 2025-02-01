/* convert base64 to Blob */
export function b64ToBlob(b64: string, type = 'text/plain') {
  const bin = atob(b64);
  const bytes = [...bin].map(c => c.charCodeAt(0));
  const buf = new Uint8Array(bytes);
  return new Blob([buf], { type });
}
