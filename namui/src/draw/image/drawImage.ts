import { EngineContext, ImageDrawCommand } from "../../type";
import { getRectsInFit } from "./getRectsInFit";

export function drawImage(
  engineContext: EngineContext,
  command: ImageDrawCommand,
): void {
  const { canvas, imageLoader } = engineContext;
  const { x, y, url, size, fit } = command;
  const image = imageLoader.tryLoad(url);
  if (!image) {
    return;
  }
  const imageInfo = image.getImageInfo();

  if (
    [size.width, size.height, imageInfo.width, imageInfo.height].includes(0)
  ) {
    return;
  }
  const { srcRect, destRect } = getRectsInFit({
    fit,
    imageSize: imageInfo,
    commandRect: {
      ...size,
      x,
      y,
    },
  });

  const fillPaint = new CanvasKit.Paint();
  fillPaint.setStyle(CanvasKit.PaintStyle.Fill);

  canvas.drawImageRect(image, srcRect, destRect, fillPaint);

  fillPaint.delete();
}
