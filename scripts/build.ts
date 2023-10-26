'use strict';

/**
 * Opens the meta.json file in src/meta.json
 * Generates an output folder
 * Reads the files located in src/icons
 * For each file it optimizes and generates the JSX then saves the new SVG to output/<key>.svg
 * A meta file is generated which contains the SVG, the JSX and the tags
 * Meta file is output to output/meta.json and web/meta.json
 */
import { scaleSVG, SVG, cleanupSVG } from '@iconify/tools';
import * as fs from 'fs';
import * as path from 'path';
import { optimize } from 'svgo';

export interface MetaRaw {
  [key: string]: string[];
}

export interface Meta {
  [key: string]: {
    tags: string[];
    svg: string;
    svgMini: string;
    jsx: string;
    jsxMini: string;
  };
}

const iconOutputLoc = '.' + path.sep + 'output';
const metaOutputLocWeb = '.' + path.sep + 'web' + path.sep;
const metaOutputLoc = '.' + path.sep + 'output' + path.sep;
const srcInputLoc = '.' + path.sep + 'src';

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

function openMeta(): MetaRaw {
  // Check meta exists

  const fileExists = fs.existsSync(srcInputLoc + path.sep + 'meta.json');

  if (!fileExists) {
    console.log('Process Failed: meta.json file missing');
    return;
  }

  if (!fs.existsSync('.' + path.sep + 'output')) {
    fs.mkdirSync('.' + path.sep + 'output');
    console.log('- Created output folder');
  } else {
    console.log('Directory already exists.');
  }

  // Open Meta file
  const metaRaw: Buffer = fs.readFileSync(srcInputLoc + path.sep + 'meta.json');
  return JSON.parse(metaRaw.toString());
}

function updateMeta(meta: Meta | MetaRaw) {
  fs.writeFileSync(
    srcInputLoc + path.sep + 'meta.json',
    JSON.stringify(meta, null, 2)
  );
}

async function optimizeAndJSX(svg: string, key: string) {
  console.log(' - Optimizing');

  svg = convertCurrentColor(svg);
  const result = optimize(svg, {
    // optional but recommended field
    path: srcInputLoc + path.sep + 'icons' + path.sep + key + '.svg',
    // all config fields are also available here
    multipass: true
  });

  console.log(' - Converting to JSX');
  // let jsx: string = await svgtojsx(result.data);
  const jsx = convertToJSX(result.data);

  return [result.data, jsx];
}

async function main() {
  const metaOut = {};

  let files: string[] = fs.readdirSync(srcInputLoc + path.sep + 'icons');
  files = files
    .filter(file => path.extname(file).toLowerCase() === '.svg')
    .map(file => path.parse(file).name);

  const meta: MetaRaw = openMeta();

  // Add any missing values to meta
  files.forEach(file => {
    if (!meta[file]) {
      console.log(`meta missing key ${file} - adding`);
      meta[file] = [];
    }
  });

  updateMeta(meta);

  for (let i = 0; i < files.length; i++) {
    // let key = Object.keys(meta)[i];
    const key = files[i];

    console.log('Converting: ' + key + '.svg');
    // Check if SVG exists

    const fileExists = fs.existsSync(
      srcInputLoc + path.sep + 'icons' + path.sep + key + '.svg'
    );

    if (!fileExists) {
      console.log("Process Failed: SVG missing for file '" + key + ".svg'");
      return;
    }

    const data = fs.readFileSync(
      srcInputLoc + path.sep + 'icons' + path.sep + key + '.svg',
      { encoding: 'utf-8' }
    );
    console.log(' - Resizing');

    const svgClass = new SVG(data);
    cleanupSVG(svgClass);
    const [optimizedSvgString, jsx] = await optimizeAndJSX(
      svgClass.toString(),
      key
    );
    scaleSVG(svgClass, 5 / 6);
    const [optimizedSvgStringMini, jsxMini] = await optimizeAndJSX(
      svgClass.toString(),
      key
    );

    console.log(' - Saving file: ' + iconOutputLoc + path.sep + key + '.svg');
    console.log(optimizedSvgString);
    fs.writeFile(
      iconOutputLoc + path.sep + key + '.svg',
      optimizedSvgString,
      'utf-8',
      err => {
        if (err) {
          console.log('Error: ' + err);
        }
      }
    );

    console.log(' - Updating Meta');
    const keyMetaData = {
      tags: meta[key],
      svg: optimizedSvgString,
      jsx: jsx,
      svgMini: optimizedSvgStringMini,
      jsxMini: jsxMini
    };
    metaOut[key] = keyMetaData;
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
      console.log(err);
    }
  });
  fs.writeFile(metaOutputLocWeb + 'meta.json', metaOutJson, 'utf-8', err => {
    if (err) {
      console.log(err);
    }
  });
  console.log('Done');
}

try {
  main();
} catch (err) {
  console.log(err);
}
