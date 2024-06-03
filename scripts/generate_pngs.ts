'use strict';

/* Generates PNGs for all of the icons */
import { iterateVariants, readInputMeta } from './lib';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

async function generatePNGs(
  metaLoc: string,
  srcInputLoc: string,
  iconOutputLoc: string
) {
  // Clear out icons file
  if (fs.existsSync(iconOutputLoc)) {
    fs.rmSync(iconOutputLoc, { recursive: true });
  }
  fs.mkdirSync(iconOutputLoc, { recursive: true });

  // Open Meta file
  const meta = readInputMeta();

  for (const key of Object.keys(meta.icons)) {
    console.log('Converting: ' + key + '.svg');

    // Check if SVG exists
    const fileExists = fs.existsSync(path.resolve(srcInputLoc, key + '.svg'));
    if (!fileExists) {
      console.error("Process Failed: SVG missing for file '" + key + ".svg'");
      return process.exit(1);
    }

    console.log(' - Converting to PNG');
    // Convert SVG to PNG
    try {
      await sharp(path.resolve(srcInputLoc, key + '.svg'))
        .png()
        .toFile(path.resolve(iconOutputLoc, key + '.png'));
    } catch (err) {
      console.error(err);
      console.error(
        "Process Failed: Could not convert to png for file '" + key + ".svg'"
      );
      return process.exit(1);
    }
  }
}

async function main() {
  iterateVariants(async (variant: string, size: string) => {
    await generatePNGs(
      path.resolve('.', 'src'),
      path.resolve('.', 'src', 'icons', variant, size),
      path.resolve('.', 'web', 'public', 'icons', variant, size)
    );
  });
}

main();
