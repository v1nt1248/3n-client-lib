import { blobToB64 } from './blob-to-b64';
import type { Nullable } from '@/components/types';

export async function createVideoThumbnail(file: File, targetSize: number, seekTo: number): Promise<Nullable<string>> {
  return new Promise(resolve => {
    const videoPlayer = document.createElement('video');
    videoPlayer.setAttribute('src', URL.createObjectURL(file));
    videoPlayer.load();

    videoPlayer.addEventListener('error', err => {
      console.error(`The error loading video file ${file.name}. `, err);
      resolve(null);
    });
    // load metadata of the video to get video duration and dimensions
    videoPlayer.addEventListener('loadedmetadata', () => {
      // seek to user defined timestamp (in seconds) if possible
      if (videoPlayer.duration < seekTo) {
        console.error(`The video [${file.name}] is too short.`);
        resolve(null);
        return;
      }
      // delay seeking or else 'seeked' event won't fire on Safari
      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 200);
      // extract video thumbnail once seeking is complete
      videoPlayer.addEventListener('seeked', () => {
        // define a canvas to have the same dimension as the video
        const canvas = document.createElement('canvas');
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;
        // draw the video frame to canvas
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(videoPlayer.src);

        ctx.canvas.toBlob(
          async blob => {
            const dataUrl = await blobToB64(blob!);
            resolve(`data:image/jpeg;base64,${dataUrl}`);
            // resolve(dataUrl);
            // `data:image/jpeg;base64,${res}`;
          },
          'image/jpeg',
          0.75 /* quality */,
        );
      });
    });
  });
}
