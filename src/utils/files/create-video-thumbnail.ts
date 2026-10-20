import type { Nullable } from '../../types';

const DEFAULT_TIMEOUT = 10000;
// seeking right after the metadata is loaded does not fire 'seeked' on Safari
const SEEK_DELAY = 200;

/**
 * create a thumbnail of a video frame
 * @param file {File} - video file
 * @param targetSize {number} - target size of the smaller side of the thumbnail; smaller videos are not enlarged
 * @param seekTo {number} - time of the frame (in seconds); the middle of the video is taken if it is shorter
 * @param timeout {number} - time (in milliseconds) after which the attempt is given up
 * @return {string | null} (data URL of a JPEG image) or null if the frame cannot be taken
 */
export function createVideoThumbnail(
  file: File,
  targetSize: number,
  seekTo: number,
  timeout = DEFAULT_TIMEOUT,
): Promise<Nullable<string>> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file);
    const videoPlayer = document.createElement('video');
    let seekTimer: ReturnType<typeof setTimeout> | undefined;
    let isFinished = false;

    const finish = (result: Nullable<string>) => {
      if (isFinished) {
        return;
      }

      isFinished = true;
      clearTimeout(timeoutTimer);
      clearTimeout(seekTimer);
      videoPlayer.removeEventListener('error', onError);
      videoPlayer.removeEventListener('loadedmetadata', onLoadedMetadata);
      videoPlayer.removeEventListener('seeked', onSeeked);
      // the element is released before the URL is revoked: otherwise it keeps reading the revoked URL
      videoPlayer.pause();
      videoPlayer.removeAttribute('src');
      videoPlayer.load();
      URL.revokeObjectURL(url);
      resolve(result);
    };

    function onError(err: Event) {
      console.error(`The error loading video file ${file.name}. `, err);
      finish(null);
    }

    function onLoadedMetadata() {
      const time = videoPlayer.duration < seekTo ? videoPlayer.duration / 2 : seekTo;
      seekTimer = setTimeout(() => {
        videoPlayer.currentTime = time;
      }, SEEK_DELAY);
    }

    function onSeeked() {
      try {
        const { videoWidth, videoHeight } = videoPlayer;
        if (!videoWidth || !videoHeight) {
          // e.g. a file without a video track
          finish(null);
          return;
        }

        const scale = Math.min(1, targetSize / Math.min(videoWidth, videoHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(videoWidth * scale);
        canvas.height = Math.round(videoHeight * scale);
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        finish(canvas.toDataURL('image/jpeg', 0.75));
      } catch (err) {
        console.error(`The error creating a thumbnail of video file ${file.name}. `, err);
        finish(null);
      }
    }

    // media events and timers come asynchronously, so finish() never runs before this is set
    const timeoutTimer = setTimeout(() => {
      console.error(`The thumbnail of video file ${file.name} has not been created in ${timeout} ms.`);
      finish(null);
    }, timeout);

    videoPlayer.muted = true;
    videoPlayer.preload = 'metadata';
    videoPlayer.addEventListener('error', onError, { once: true });
    videoPlayer.addEventListener('loadedmetadata', onLoadedMetadata, { once: true });
    videoPlayer.addEventListener('seeked', onSeeked, { once: true });
    videoPlayer.src = url;
  });
}
