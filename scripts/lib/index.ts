import * as fs from 'fs';
import * as path from 'path';

const inputMetaLocation = path.resolve('.', 'src', 'meta.json');

export type Size = 'base' | 'sm';
export type Variant = 'standard';
export type VariantSize = `${Variant}_${Size}`;

// The output Meta type
export interface OutputMeta {
  [key: string]: {
    keywords: string[];
    variants: {
      [key in Variant]?: {
        [key in Size]?: OutputMetaIcon;
      };
    };
  };
}

export interface OutputMetaIcon {
  jsx: string;
  svg: string;
}

// The input Meta type
export interface InputMeta {
  variants: {
    standard: {
      description: string;
    };
  };
  sizes: {
    sm: {
      width: number;
      height: number;
    };
    base: {
      width: number;
      height: number;
    };
  };
  icons: MetaIconList;
}

export interface MetaIconList {
  [key: string]: MetaIcon;
}

export interface MetaIcon {
  keywords: string[];
  history: {
    [key in VariantSize]?: {
      created: string;
      updated: string[];
      removed?: string;
    };
  };
}

function readFilenames(location: string) {
  let files: string[] = fs.readdirSync(location);
  files = files
    .filter(file => path.extname(file).toLowerCase() === '.svg')
    .map(file => path.parse(file).name);
  return files;
}

/**
 * Iterates over each variant and size.
 *
 * @param func Function to execute per variant and size
 */
export async function iterateVariants(
  func: (variant: Variant, size: Size) => void | Promise<void>
) {
  const meta = readInputMeta(true);

  const variants = Object.keys(meta.variants) as Variant[];
  const sizes = Object.keys(meta.sizes) as Size[];

  for (const variant of variants) {
    for (const size of sizes) {
      await func(variant, size);
    }
  }
}

/**
 * Generate the key used to access the content for a variant/size
 *
 * @param variant Variant to generate key for
 * @param size Size to generate key for
 * @returns Size variant key
 */
export function generateSizeVariantKey(variant: Variant, size: Size) {
  return `${variant}_${size}` as const;
}

/**
 * Gets all SVG filenames for the input location for a specific variant and size.
 *
 * @param variant Variants to get files for
 * @param size Size to get files for
 * @returns Array of file names.
 */
export function readInputFilenames(variant: Variant, size: Size) {
  return readFilenames(path.resolve('.', 'src', 'icons', variant, size));
}

/**
 * Gets all SVG filenames for the output location for a specific variant and size.
 *
 * @param variant Variants to get files for
 * @param size Size to get files for
 * @returns Array of file names.
 */
export function readOutputFilenames(variant: Variant, size: Size) {
  return readFilenames(path.resolve('.', 'src', 'optimised', variant, size));
}

/**
 * Generates the file path for the icons input location.
 *
 * @param variant Variants to get file location for
 * @param size Size to get file location for
 * @param file Optional filename to add to the end of the path
 * @returns File path
 */
export function getInputLocation(variant: Variant, size: Size, file?: string) {
  if (file) {
    return path.resolve('.', 'src', 'icons', variant, size, file);
  }
  return path.resolve('.', 'src', 'icons', variant, size);
}

export function readInputMeta(skipLogging?: boolean): InputMeta {
  if (!skipLogging) console.log('Reading input meta file');
  // Check meta exists
  const fileExists = fs.existsSync(inputMetaLocation);

  if (!fileExists) {
    console.error('Process Failed: meta.json file missing');
    return process.exit(1);
  }

  // Open Meta file
  const metaRaw: Buffer = fs.readFileSync(inputMetaLocation);
  return JSON.parse(metaRaw.toString());
}

export function writeInputMeta(meta: InputMeta) {
  console.log('Writing output meta file');
  fs.writeFileSync(inputMetaLocation, JSON.stringify(meta, null, 2));
}

export const unreleasedString = 'unreleased';
