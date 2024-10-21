/* Script to run to when releasing the current version
 *  - Adds all the updates, additions and deletions to the CHANGELOG
 *  - Updates meta.json to change all unreleased tags to the current version
 */
import mainPackageJson from '../package.json';
import {
  generateSizeVariantKey,
  iterateVariants,
  readInputMeta,
  Size,
  unreleasedString,
  Variant,
  writeInputMeta
} from './lib';
import * as fs from 'fs';
import * as path from 'path';

const changelogPath = path.resolve('CHANGELOG.md');

function generateString(
  type: 'addition' | 'update' | 'removal',
  size: Size,
  variant: Variant,
  icon: string
) {
  let actionString = '';
  switch (type) {
    case 'addition':
      actionString = 'Added';
      break;
    case 'update':
      actionString = 'Updated';
      break;
    case 'removal':
      actionString = 'Removed';
      break;
    default:
      actionString = '';
      break;
  }
  return `- ${actionString} \`${icon}\` icon - \`${size}\`/\`${variant}\``;
}

function updateChangelog(
  additions: string[],
  updates: string[],
  removals: string[]
) {
  const fileExists = fs.existsSync(changelogPath);

  if (!fileExists) {
    console.error('Process Failed: meta.json file missing');
    return process.exit(1);
  }

  // Open Meta file
  const changelog = fs.readFileSync(changelogPath).toString();

  // Find the line with ## [Unreleased]
  const unreleasedLine = '## [Unreleased]';
  const unreleasedIndex = changelog.indexOf(unreleasedLine);
  if (unreleasedIndex === -1) {
    console.error('Could not find "## [Unreleased]" in the file.');
    return;
  }

  // Find the next version position
  const regex = /## \[\d+.\d+.\d+\]( - \d\d\d\d-\d\d-\d\d)?/;
  const match = changelog.match(regex);
  const matchIndex =
    match && match.length > 0 ? changelog.indexOf(match[0]) : changelog.length;

  const changes =
    '\n\n### Added\n\n' +
    additions
      .filter(
        addition =>
          changelog.slice(unreleasedIndex, matchIndex).indexOf(addition) === -1
      )
      .join('\n') +
    '\n\n### Changed\n\n' +
    updates
      .filter(
        update =>
          changelog.slice(unreleasedIndex, matchIndex).indexOf(update) === -1
      )
      .join('\n') +
    '\n\n### Removed\n\n' +
    removals
      .filter(
        removal =>
          changelog.slice(unreleasedIndex, matchIndex).indexOf(removal) === -1
      )
      .join('\n');

  const modifiedData =
    changelog.slice(0, unreleasedIndex + unreleasedLine.length) +
    changes +
    changelog.slice(unreleasedIndex + unreleasedLine.length);

  console.log('Saving new changelog');
  fs.writeFileSync(changelogPath, modifiedData);
}

async function updateMeta() {
  const meta = readInputMeta();

  await iterateVariants((variant, size) => {
    Object.keys(meta.icons).forEach(iconKey => {
      const history =
        meta.icons[iconKey].history[generateSizeVariantKey(variant, size)];

      if (!history) return;

      if (history.created === unreleasedString) {
        history.created = mainPackageJson.version;
      }

      if (history.updated.at(-1) === unreleasedString) {
        history.updated[history.updated.length - 1] = mainPackageJson.version;
      }

      if (history.removed === unreleasedString) {
        history.removed = mainPackageJson.version;
      }
    });
  });

  writeInputMeta(meta);
}

async function main() {
  const additions: string[] = [];
  const updates: string[] = [];
  const removals: string[] = [];

  const meta = readInputMeta();

  await iterateVariants(async (variant, size) => {
    Object.keys(meta.icons).forEach(key => {
      const history =
        meta.icons[key].history[generateSizeVariantKey(variant, size)];

      if (history) {
        if (history.created === unreleasedString) {
          additions.push(generateString('addition', size, variant, key));
        }
        if (history.removed && history.removed === unreleasedString) {
          removals.push(generateString('removal', size, variant, key));
        }

        if (
          history.updated.length > 0 &&
          history.updated[history.updated.length - 1] === unreleasedString
        ) {
          updates.push(generateString('update', size, variant, key));
        }
      }
    });
  });

  updateChangelog(additions, updates, removals);
  updateMeta();
}

main();
