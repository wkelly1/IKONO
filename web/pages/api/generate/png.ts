import {
  setSVGColour,
  wrapInCircle,
  wrapInSquare
} from '../../../lib/svgAdjustments';
import Meta from '../../../meta.json';
import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { parse } from 'url';

const defaultIconSize = 24;

function error(message: string) {
  return {
    error: true,
    message
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query } = parse(req.url, true);
  const { icon, variant, size, icon_size, color, wrapper } = query;

  if (!icon || !variant || !size) {
    return res.status(400).json(error('Missing required parameter'));
  }

  if (
    typeof icon !== 'string' ||
    typeof size !== 'string' ||
    typeof variant !== 'string'
  ) {
    return res.status(400).json(error('Invalid required parameter'));
  }

  const icon_size_number = Number(icon_size) || defaultIconSize;

  const iconMeta = Meta[icon];

  if (!iconMeta) {
    return res.status(404).json(error('Icon does not exist'));
  }

  let svgString = iconMeta.variants[variant][size].svg;
  if (wrapper === 'square') {
    svgString = wrapInSquare(
      svgString,
      size === 'sm' ? 'mini' : 'normal'
    ).toString();
  }

  if (wrapper === 'circle') {
    svgString = wrapInCircle(
      svgString,
      size === 'sm' ? 'mini' : 'normal'
    ).toString();
  }

  if (
    color &&
    typeof color === 'string' &&
    color.match(/^(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)
  ) {
    svgString = setSVGColour(svgString, color);
  }

  const buffer = Buffer.from(svgString);

  try {
    const png = await sharp(buffer)
      .resize(icon_size_number * 4, icon_size_number * 4)
      .png()
      .toBuffer();
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename=${icon}.png`);
    return res.send(png);
  } catch (err) {
    return res.status(500).json(error('Could not generate png' + err));
  }
}
