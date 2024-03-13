'use strict';

/* Generates PNGs for all of the icons */
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const iconVariants = ['standard'];
const iconSizes = ['24x24'];

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
  const metaRaw = fs.readFileSync(path.resolve(metaLoc, 'meta.json'));
  const meta = JSON.parse(metaRaw.toString());

  for (const key of Object.keys(meta)) {
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
  for (const variant of iconVariants) {
    for (const size of iconSizes) {
      await generatePNGs(
        path.resolve('.', 'src'),
        path.resolve('.', 'src', 'icons', variant, size),
        path.resolve('.', 'web', 'public', 'icons', variant, size)
      );
    }
  }
}

main();
