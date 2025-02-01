/**
 * resize image
 * @param imageBase64 {string} - image (base64)
 * @param targetSize {number} -  target size of the smaller side of the image
 * @return {string} (base64)
 */
export function resizeImage(imageBase64: string, targetSize: number): Promise<string> {
  return new Promise(resolve => {
    const tempImg = new Image();

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
      resolve(dataUrl);
    };

    tempImg.src = imageBase64;
  });
}
