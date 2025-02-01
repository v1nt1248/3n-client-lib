export function uint8ToBase64(inputData: Uint8Array, type = 'image/png'): string {
  let size = inputData.length;
  const binaryString = new Array(size);
  while (size--) {
    binaryString[size] = String.fromCharCode(inputData[size]);
  }
  const data = binaryString.join('');
  const base64 = window.btoa(data);
  return `data:${type};base64,${base64}`;
}
