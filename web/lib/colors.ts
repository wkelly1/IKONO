/**
 *
 * @param color Color to get the brightness of
 * @returns A brightness value (> 127.5 suggests bright)
 */
export const getBrightness = (color: string) => {
  color = color.replace(/^#/, '');

  const bigint = parseInt(color, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return Math.sqrt(0.229 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
};
