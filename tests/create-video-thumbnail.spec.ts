import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createVideoThumbnail } from '../src/utils/files/create-video-thumbnail';

const BLOB_URL = 'blob:http://localhost/video';

function setupVideo({ duration = 30, width = 1920, height = 1080 } = {}) {
  let video: HTMLVideoElement | undefined;
  let canvas: HTMLCanvasElement | undefined;
  const calls: string[] = [];

  const createElement = document.createElement.bind(document);
  vi.spyOn(document, 'createElement').mockImplementation((tag: string, options?: ElementCreationOptions) => {
    const el = createElement(tag, options);
    if (tag === 'video') {
      video = el as HTMLVideoElement;
      Object.defineProperty(video, 'duration', { value: duration });
      Object.defineProperty(video, 'videoWidth', { value: width });
      Object.defineProperty(video, 'videoHeight', { value: height });
      const removeAttribute = video.removeAttribute.bind(video);
      vi.spyOn(video, 'removeAttribute').mockImplementation(name => {
        calls.push(`removeAttribute:${name}`);
        removeAttribute(name);
      });
    } else if (tag === 'canvas') {
      canvas = el as HTMLCanvasElement;
    }
    return el;
  });

  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => calls.push('load'));
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => calls.push('pause'));
  const drawImage = vi.fn();
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({ drawImage } as never);
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/jpeg;base64,AAA');
  const revokeObjectURL = vi.fn(() => calls.push('revokeObjectURL'));
  URL.createObjectURL = vi.fn(() => BLOB_URL);
  URL.revokeObjectURL = revokeObjectURL;

  return {
    get video() {
      return video!;
    },
    get canvas() {
      return canvas;
    },
    calls,
    drawImage,
    revokeObjectURL,
  };
}

const file = new File(['x'], 'clip.mp4', { type: 'video/mp4' });

describe('createVideoThumbnail', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('draws the frame scaled to the target size of the smaller side', async () => {
    const env = setupVideo({ width: 1920, height: 1080 });
    const promise = createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('loadedmetadata'));
    await vi.advanceTimersByTimeAsync(200);
    expect(env.video.currentTime).toBe(5);
    env.video.dispatchEvent(new Event('seeked'));

    await expect(promise).resolves.toBe('data:image/jpeg;base64,AAA');
    expect(env.canvas!.width).toBe(356);
    expect(env.canvas!.height).toBe(200);
    expect(env.drawImage).toHaveBeenCalledWith(env.video, 0, 0, 356, 200);
    expect(HTMLCanvasElement.prototype.toDataURL).toHaveBeenCalledWith('image/jpeg', 0.75);
  });

  it('does not enlarge a video smaller than the target size', async () => {
    const env = setupVideo({ width: 160, height: 120 });
    const promise = createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('loadedmetadata'));
    await vi.advanceTimersByTimeAsync(200);
    env.video.dispatchEvent(new Event('seeked'));

    await promise;
    expect(env.canvas!.width).toBe(160);
    expect(env.canvas!.height).toBe(120);
  });

  it('takes the middle of a video shorter than the seek time', async () => {
    const env = setupVideo({ duration: 4 });
    createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('loadedmetadata'));
    await vi.advanceTimersByTimeAsync(200);

    expect(env.video.currentTime).toBe(2);
  });

  it('releases the element before revoking the URL, exactly once', async () => {
    const env = setupVideo();
    const promise = createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('loadedmetadata'));
    await vi.advanceTimersByTimeAsync(200);
    env.video.dispatchEvent(new Event('seeked'));
    await promise;
    // late events after the end change nothing
    env.video.dispatchEvent(new Event('seeked'));
    env.video.dispatchEvent(new Event('error'));

    expect(env.revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(env.revokeObjectURL).toHaveBeenCalledWith(BLOB_URL);
    expect(env.calls.slice(-4)).toEqual(['pause', 'removeAttribute:src', 'load', 'revokeObjectURL']);
  });

  it('resolves to null on a loading error and revokes the URL', async () => {
    const env = setupVideo();
    const promise = createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('error'));

    await expect(promise).resolves.toBeNull();
    expect(env.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('resolves to null when no frame comes in time', async () => {
    const env = setupVideo();
    const promise = createVideoThumbnail(file, 200, 5, 1000);

    await vi.advanceTimersByTimeAsync(1000);

    await expect(promise).resolves.toBeNull();
    expect(env.revokeObjectURL).toHaveBeenCalledTimes(1);
  });

  it('resolves to null for a file without a video track', async () => {
    const env = setupVideo({ width: 0, height: 0 });
    const promise = createVideoThumbnail(file, 200, 5);

    env.video.dispatchEvent(new Event('loadedmetadata'));
    await vi.advanceTimersByTimeAsync(200);
    env.video.dispatchEvent(new Event('seeked'));

    await expect(promise).resolves.toBeNull();
    expect(env.drawImage).not.toHaveBeenCalled();
  });
});
