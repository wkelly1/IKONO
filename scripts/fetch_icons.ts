// Used to fetch all icons from figma and update the change log as needed
import {
  generateSizeVariantKey,
  getInputLocation,
  iterateVariants,
  MetaIcon,
  readInputFilenames,
  readInputMeta,
  Size,
  unreleasedString,
  Variant,
  VariantSize,
  writeInputMeta
} from './lib';
import { exec as execCallback } from 'child_process';
import crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import util from 'util';

const exec = util.promisify(execCallback);

// Create a list of all current icons
iterateVariants(async (variant: Variant, size: Size) => {
  console.log('Calculating current checksums');
  const preChecksums = await getHashes(variant, size);

  const configPath = buildFigmaConfig(variant, size);
  try {
    const { stdout, stderr } = await exec(
      `export-icons --config='${configPath}'`
    );
    console.log(stdout);
    console.log(stderr);
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }

  const postChecksums = await getHashes(variant, size);
  calculateChanges(preChecksums, postChecksums, variant, size);
});

async function getHashes(
  variant: Variant,
  size: Size
): Promise<Map<string, string>> {
  const files = readInputFilenames(variant, size);

  const checksums = new Map<string, string>();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const checksum = await getChecksum(
      getInputLocation(variant, size, file + '.svg')
    );
    checksums.set(file, checksum);
  }
  return checksums;
}

async function getChecksum(path: string): Promise<string> {
  return await new Promise(function (resolve, reject) {
    const hash = crypto.createHash('md5');
    const input = fs.createReadStream(path);

    input.on('error', reject);

    input.on('data', function (chunk) {
      hash.update(chunk);
    });

    input.on('close', function () {
      resolve(hash.digest('hex'));
    });
  });
}

function buildFigmaConfig(variant: string, size: string) {
  const figmaPersonalToken = process.env.FIGMA_PERSONAL_TOKEN;
  const fileId = process.env.FILE_ID;

  if (!figmaPersonalToken) {
    console.error('Missing environment variable: FIGMA_PERSONAL_TOKEN');
    return process.exit(1);
  }

  if (!fileId) {
    console.error('Missing environment variable: FILE_ID');
    return process.exit(1);
  }

  const config = {
    figmaPersonalToken: figmaPersonalToken,
    fileId: fileId,
    page: 'Icons v2',
    frame: `ICONS - ${size}`,
    iconsPath: path.resolve('src', 'icons', variant, size)
  };

  const configPath = path.resolve('./', 'tmp-icons-config.json');

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

  return configPath;
}

function calculateChanges(
  preChecksums: Map<string, string>,
  postChecksums: Map<string, string>,
  variant: Variant,
  size: Size
) {
  console.log(preChecksums, postChecksums);
  console.log('Calculating what icons have changed!');
  // See which files have changed
  // See what files have been added
  const changed = [];
  const added = [];
  const removed = [];
  postChecksums.forEach((checksum, name) => {
    if (preChecksums.has(name)) {
      if (preChecksums.get(name) !== checksum) {
        changed.push(name);
      }
    } else {
      added.push(name);
    }
  });

  // See what files have been removed
  preChecksums.forEach((_, name) => {
    if (!postChecksums.has(name)) {
      removed.push(name);
    }
  });
  console.log(
    'Changed:',
    changed.length,
    'Added:',
    added.length,
    'Removed:',
    removed.length
  );

  const meta = readInputMeta();
  const key = generateSizeVariantKey(variant, size);
  changed.forEach(iconName => {
    const history = meta.icons[iconName].history[key];
    if (
      history.updated[history.updated.length] !== unreleasedString &&
      history.created !== unreleasedString
    ) {
      history.updated.push(unreleasedString);
    }
  });
  added.forEach(iconName => {
    if (meta.icons[iconName]) {
      meta.icons[iconName].history[key] = {
        created: unreleasedString,
        updated: []
      };
    } else {
      const newIcon: MetaIcon = {
        keywords: [],
        history: {
          [key as VariantSize]: {
            created: unreleasedString,
            updated: []
          }
        }
      };
      meta.icons[iconName] = newIcon;
    }
  });
  removed.forEach(iconName => {
    console.log(iconName);
    console.log(meta.icons[iconName]);
    const history = meta.icons[iconName].history[key];

    if (history.created === unreleasedString) {
      delete meta.icons[iconName];
    } else if (!history.removed) {
      history.removed = unreleasedString;
    }
  });
  writeInputMeta(meta);
}
