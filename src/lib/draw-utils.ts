export const clearLayer = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const colorsMatch = (a: number[], b: number[]): boolean => {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

export const drawShape = (
  context: CanvasRenderingContext2D,
  shape: string,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  isEraser?: boolean
) => {
  context.beginPath();
  if (shape === "square") {
    context.rect(startX, startY, endX - startX, endY - startY);
  } else if (shape === "circle") {
    const radius = Math.sqrt(
      Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    context.arc(startX, startY, radius, 0, Math.PI * 2);
  } else if (shape === "triangle") {
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.lineTo(startX - (endX - startX), endY);
    context.closePath();
  }
  context.stroke();
  if (!isEraser) {
    context.fill();
  }
};

export const floodFill = (
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  fillColor: string
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const targetColor = getPixel(imageData, x, y);

  if (colorsMatch(targetColor, hexToRgba(fillColor))) return;

  const pixelsToCheck = [x, y];
  const fillColorRgba = hexToRgba(fillColor);

  while (pixelsToCheck.length > 0) {
    const y = pixelsToCheck.pop()!;
    const x = pixelsToCheck.pop()!;

    const currentColor = getPixel(imageData, x, y);
    if (
      colorsMatch(currentColor, targetColor) &&
      !colorsMatch(currentColor, fillColorRgba)
    ) {
      setPixel(imageData, x, y, fillColorRgba);

      if (x > 0) pixelsToCheck.push(x - 1, y);
      if (y > 0) pixelsToCheck.push(x, y - 1);
      if (x < canvas.width - 1) pixelsToCheck.push(x + 1, y);
      if (y < canvas.height - 1) pixelsToCheck.push(x, y + 1);
    }
  }

  ctx.putImageData(imageData, 0, 0);
};

export const hexToRgba = (hex: string): number[] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
        255,
      ]
    : [0, 0, 0, 255];
};

export const getPixel = (
  imageData: ImageData,
  x: number,
  y: number
): number[] => {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1]; // impossible color
  } else {
    const offset = (y * imageData.width + x) * 4;
    return Array.from(imageData.data.slice(offset, offset + 4));
  }
};

export const setPixel = (
  imageData: ImageData,
  x: number,
  y: number,
  color: number[]
) => {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = color[3];
};

export const rotateCanvas = (
  canvas: HTMLCanvasElement,
  clockwise: boolean = true
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((clockwise ? 90 : -90) * (Math.PI / 180));
  ctx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);
  ctx.restore();
};

export const mirrorCanvas = (
  canvas: HTMLCanvasElement,
  horizontal: boolean = true
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.save();

  if (horizontal) {
    ctx.scale(-1, 1);
    ctx.drawImage(canvas, -canvas.width, 0);
  } else {
    ctx.scale(1, -1);
    ctx.drawImage(canvas, 0, -canvas.height);
  }

  ctx.restore();
};
