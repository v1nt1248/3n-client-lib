import { describe, expect, it } from 'vitest';
import { getFileExtension } from '../src/utils/files/get-file-extension';
import { formatFileSize } from '../src/utils/files/format-file-size';
import { isFileImage } from '../src/utils/files/is-file-image';
import { isFileVideo } from '../src/utils/files/is-file-video';
import { isFileAudio } from '../src/utils/files/is-file-audio';
import { isFileArchive } from '../src/utils/files/is-file-archive';
import { b64ToBlob } from '../src/utils/files/b64-to-blob';
import { blobToB64 } from '../src/utils/files/blob-to-b64';
import { blobFromDataURL } from '../src/utils/files/blob-from-data-url';
import { uint8ToDataURL } from '../src/utils/files/uint8-to-data-url';
import { fileToUint8Array } from '../src/utils/files/file-to-uint8array';

describe('getFileExtension', () => {
  it('returns the lower-cased extension', () => {
    expect(getFileExtension('photo.PNG')).toBe('png');
  });

  it('takes only the last extension', () => {
    expect(getFileExtension('archive.tar.gz')).toBe('gz');
  });

  it('returns an empty string when there is no dot', () => {
    expect(getFileExtension('README')).toBe('');
    expect(getFileExtension('')).toBe('');
  });

  it('treats a leading dot as an extension separator', () => {
    expect(getFileExtension('.gitignore')).toBe('gitignore');
  });
});

describe('formatFileSize', () => {
  it('renders a falsy size as zero', () => {
    expect(formatFileSize()).toBe('0');
    expect(formatFileSize(0)).toBe('0');
  });

  it('keeps bytes below one kilobyte', () => {
    expect(formatFileSize(1023)).toBe('1023.00 B');
  });

  it('steps up through the units', () => {
    expect(formatFileSize(1024)).toBe('1.00 KB');
    expect(formatFileSize(1024 * 1024)).toBe('1.00 MB');
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 GB');
  });
});

describe('file kind helpers', () => {
  it('detects by mime type', () => {
    expect(isFileImage({ type: 'image/png' })).toBe(true);
    expect(isFileVideo({ type: 'video/mp4' })).toBe(true);
    expect(isFileAudio({ type: 'audio/mpeg' })).toBe(true);
    expect(isFileArchive({ type: 'application/zip' })).toBe(true);
  });

  it('falls back to the extension when there is no type', () => {
    expect(isFileImage({ fullName: 'photo.PNG' })).toBe(true);
    expect(isFileVideo({ fullName: 'clip.mkv' })).toBe(true);
    expect(isFileAudio({ fullName: 'song.mp3' })).toBe(true);
    expect(isFileArchive({ fullName: 'bundle.zip' })).toBe(true);
  });

  it('prefers the type over the extension', () => {
    expect(isFileImage({ type: 'text/plain', fullName: 'photo.png' })).toBe(false);
    expect(isFileAudio({ type: 'audio/mpeg', fullName: 'photo.png' })).toBe(true);
  });

  it('returns false when nothing identifies the file', () => {
    expect(isFileImage({})).toBe(false);
    expect(isFileVideo({})).toBe(false);
    expect(isFileAudio({})).toBe(false);
    expect(isFileArchive({})).toBe(false);
    expect(isFileImage({ fullName: 'file.unknown' })).toBe(false);
  });
});

describe('base64 blob conversions', () => {
  it('round-trips base64 through a blob', async () => {
    const blob = b64ToBlob('aGVsbG8=', 'text/plain');

    expect(blob.type).toBe('text/plain');
    expect(blob.size).toBe(5);
    await expect(blobToB64(blob)).resolves.toBe('aGVsbG8=');
  });

  it('defaults the blob type to text/plain', () => {
    expect(b64ToBlob('aGVsbG8=').type).toBe('text/plain');
  });
});

describe('blobFromDataURL', () => {
  it('parses a base64 data url', async () => {
    const blob = blobFromDataURL('data:text/plain;base64,aGVsbG8=');

    expect(blob.type).toBe('text/plain');
    await expect(blobToB64(blob)).resolves.toBe('aGVsbG8=');
  });

  it('throws on a string that is not a data url', () => {
    expect(() => blobFromDataURL('plain text')).toThrow();
  });
});

describe('uint8ToDataURL', () => {
  it('encodes bytes with an explicit type', () => {
    expect(uint8ToDataURL(new Uint8Array([104, 105]), 'text/plain')).toBe('data:text/plain;base64,aGk=');
  });

  it('defaults to image/png', () => {
    expect(uint8ToDataURL(new Uint8Array([104, 105]))).toBe('data:image/png;base64,aGk=');
  });
});

describe('fileToUint8Array', () => {
  it('reads the file bytes', async () => {
    const file = new File(['hello'], 'a.txt');
    const bytes = await fileToUint8Array(file);

    expect(bytes).toBeInstanceOf(Uint8Array);
    expect(Array.from(bytes ?? [])).toEqual([104, 101, 108, 108, 111]);
  });
});
