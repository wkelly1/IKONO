import { readInputMeta } from './lib';
import * as fs from 'fs';
import * as path from 'path';

const meta = readInputMeta();

const versionMap: {
  [key: string]: { created: string[]; updated: string[]; removed: string[] };
} = {};

Object.keys(meta.icons).forEach(iconKey => {
  ['standard_base', 'standard_sm'].forEach(variant => {
    if (!(variant in meta.icons[iconKey].history)) return;
    const created = meta.icons[iconKey].history[variant].created;
    const removed = meta.icons[iconKey].history[variant].removed;

    const variantString = variant === 'standard_base' ? 'base' : 'sm';
    if (versionMap[created]) {
      versionMap[created].created.push(
        '- Added `' + iconKey + '` icon - `' + variantString + '`/`standard`'
      );
    } else {
      versionMap[created] = {
        created: [
          '- Added `' + iconKey + '` icon - `' + variantString + '`/`standard`'
        ],
        updated: [],
        removed: []
      };
    }

    meta.icons[iconKey].history.standard_base.updated.forEach(updated => {
      if (versionMap[updated]) {
        versionMap[updated].updated.push(
          '- Updated `' +
            iconKey +
            '` icon - `' +
            variantString +
            '`/`standard`'
        );
      } else {
        versionMap[updated] = {
          updated: [
            '- Updated `' +
              iconKey +
              '` icon - `' +
              variantString +
              '`/`standard`'
          ],
          removed: [],
          created: []
        };
      }
    });

    if (removed) {
      if (versionMap[removed]) {
        versionMap[removed].removed.push(
          '- Removed `' +
            iconKey +
            '` icon - `' +
            variantString +
            '`/`standard`'
        );
      } else {
        versionMap[removed] = {
          removed: [
            '- Removed `' +
              iconKey +
              '` icon - `' +
              variantString +
              '`/`standard`'
          ],
          created: [],
          updated: []
        };
      }
    }
  });
});

let changelog = '';

Object.keys(versionMap)
  .toSorted()
  .reverse()
  .forEach(version => {
    changelog += `## [${version}]\n`;

    if (versionMap[version].created.length > 0) {
      changelog += '\n### Added\n\n';
    }
    versionMap[version].created.forEach(created => {
      changelog += created + '\n';
    });

    if (versionMap[version].updated.length > 0) {
      changelog += '\n### Updated\n\n';
    }
    versionMap[version].updated.forEach(created => {
      changelog += created + '\n';
    });
    if (versionMap[version].removed.length > 0) {
      changelog += '\n### Removed\n\n';
    }
    versionMap[version].removed.forEach(created => {
      changelog += created + '\n';
    });

    changelog += '\n';
  });

console.log(changelog);

const changelogPath = path.resolve('CHANGELOG.md');
const changelogIn = fs.readFileSync(changelogPath).toString();
fs.writeFileSync(changelogPath, changelogIn + changelog);
