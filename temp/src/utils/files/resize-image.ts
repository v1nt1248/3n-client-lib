/**
 * resize image
 * @param data {string | File | Blob} - image (base64 or File or Blob)
 * @param targetSize {number} -  target size of the smaller side of the image
 * @return {string} (base64)
 */
export function resizeImage(
  data: string | File | Blob,
  targetSize: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const tempImg = document.createElement('img');

      tempImg.onload = function () {
        const tempImgSize = {
          width: tempImg.width,
          height: tempImg.height,
        };

        if (tempImgSize.width > tempImgSize.height) {
          tempImgSize.width = (tempImgSize.width * targetSize) / tempImgSize.height;
          tempImgSize.height = targetSize;
        } else {
          tempImgSize.height = (tempImgSize.height * targetSize) / tempImgSize.width;
          tempImgSize.width = targetSize;
        }

        const canvas = document.createElement('canvas');
        canvas.width = tempImgSize.width;
        canvas.height = tempImgSize.height;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(tempImg, 0, 0, tempImgSize.width, tempImgSize.height);
        const dataUrl = canvas.toDataURL();

        if (typeof data !== 'string') {
          URL.revokeObjectURL(tempImg.src);
        }

        resolve(dataUrl);
      };

      tempImg.src = typeof data === 'string' ? data : URL.createObjectURL(data);
    } catch (err) {
      reject(err);
    }
  });
}
