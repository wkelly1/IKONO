'use strict';

/**
 * Opens the meta.json file in src/meta.json
 * Generates an output folder
 * Reads the files located in src/icons
 * For each file it optimizes and generates the JSX then saves the new SVG to output/<key>.svg
 * A meta file is generated which contains the SVG, the JSX and the tags
 * Meta file is output to output/meta.json and web/meta.json
 */
import {
  getInputLocation,
  iterateVariants,
  OutputMeta,
  OutputMetaIcon,
  readInputFilenames,
  readInputMeta,
  Size,
  Variant,
  writeInputMeta
} from './lib';
import { SVG, cleanupSVG } from '@iconify/tools';
import * as fs from 'fs';
import * as path from 'path';
import { optimize } from 'svgo';

const metaOutputLocWeb = '.' + path.sep + 'web' + path.sep;
const metaOutputLoc = '.' + path.sep + 'output' + path.sep;

const convertCurrentColor = (svg: string) => {
  const reStroke =
    /stroke=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|black|white)("|')/g;
  const reFill =
    /fill=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3}|black|white)("|')/g;

  svg = svg.replaceAll(reStroke, "stroke='currentColor'");
  svg = svg.replaceAll(reFill, "fill='currentColor'");

  return svg;
};

const convertToJSX = (svg: string) => {
  return svg.replaceAll(/[a-z]*-[a-z]*=/g, group => {
    const index = group.indexOf('-') + 1;
    const newString =
      group.substring(0, index) +
      group[index].toUpperCase() +
      group.substring(index + 1);
    return newString.replace('-', '');
  });
};

async function optimizeAndJSX(svgPath: string, svg: string, key: string) {
  console.log(' - Optimizing');

  svg = convertCurrentColor(svg);
  const result = optimize(svg, {
    // optional but recommended field
    path: path.resolve(svgPath, key + '.svg'),
    // all config fields are also available here
    multipass: true
  });

  console.log(' - Converting to JSX');
  // let jsx: string = await svgtojsx(result.data);
  const jsx = convertToJSX(result.data);

  return [result.data, jsx];
}

async function buildIcons(
  variant: Variant,
  size: Size,
  outputLocation: string,
  metaOut: OutputMeta
) {
  const inputLocation = getInputLocation(variant, size);
  console.log('## Building and optimising icons ##');

  // Delete output folder and create it again
  if (fs.existsSync(outputLocation)) {
    fs.rmSync(outputLocation, { recursive: true });
  }
  fs.mkdirSync(outputLocation, { recursive: true });

  const files = readInputFilenames(variant, size);

  const meta = readInputMeta();

  if (!fs.existsSync(path.resolve('.', 'output'))) {
    fs.mkdirSync(path.resolve('.', 'output'));
    console.log('Created output folder');
  } else {
    console.log('Directory already exists.');
  }

  // Add any missing values to meta
  files.forEach(file => {
    if (!meta[file]) {
      console.log(`meta missing key ${file} - adding`);
      meta[file] = [];
    }
  });

  writeInputMeta(meta);

  for (let i = 0; i < files.length; i++) {
    const key = files[i];

    console.log('Converting: ' + key + '.svg');

    // Check if SVG exists
    const fileExists = fs.existsSync(path.resolve(inputLocation, key + '.svg'));

    if (!fileExists) {
      console.error("Process Failed: SVG missing for file '" + key + ".svg'");
      return process.exit(1);
    }

    const data = fs.readFileSync(path.resolve(inputLocation, key + '.svg'), {
      encoding: 'utf-8'
    });

    const svgClass = new SVG(data);
    cleanupSVG(svgClass);
    const [optimizedSvgString, jsx] = await optimizeAndJSX(
      inputLocation,
      svgClass.toString(),
      key
    );

    console.log(
      ' - Saving file: ' + path.resolve(outputLocation, key + '.svg')
    );
    console.log(optimizedSvgString);
    fs.writeFile(
      path.resolve(outputLocation, key + '.svg'),
      optimizedSvgString,
      'utf-8',
      err => {
        if (err) {
          console.log('Error: ' + err);
        }
      }
    );

    console.log(' - Updating Meta');
    const keyMetaData: OutputMetaIcon = {
      svg: optimizedSvgString,
      jsx: jsx
    };

    if (key in metaOut) {
      if (variant in metaOut[key].variants) {
        metaOut[key].variants[variant][size] = keyMetaData;
      } else {
        metaOut[key].variants[variant] = {
          [size]: keyMetaData
        };
      }
    } else {
      metaOut[key] = {
        keywords: meta.icons[key].keywords,
        variants: {
          [variant]: {
            [size]: keyMetaData
          }
        }
      };
    }
    console.log(' - Moving on');
  }

  const out = {};
  const sorted = Object.keys(metaOut).sort();
  sorted.forEach(value => {
    out[value] = metaOut[value];
  });
  const metaOutJson = JSON.stringify(out);
  fs.writeFile(metaOutputLoc + 'meta.json', metaOutJson, 'utf-8', err => {
    if (err) {
      console.error('here2', err);
      return process.exit(1);
    }
  });
  fs.writeFile(metaOutputLocWeb + 'meta.json', metaOutJson, 'utf-8', err => {
    if (err) {
      console.error('here', err);
      return process.exit(1);
    }
  });
  return metaOut;
}

function main() {
  let metaOut = {};
  iterateVariants(async (variant, size) => {
    metaOut = await buildIcons(
      variant,
      size,
      path.resolve('.', 'src', 'optimised', variant, size),
      metaOut
    );
  });
  console.log('Done');
}

main();
