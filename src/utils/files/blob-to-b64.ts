/* convert Blob to base64 */
export async function blobToB64(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const bin = bytes.reduce((acc, byte) => (acc += String.fromCharCode(byte)), '');
  return btoa(bin);
}
