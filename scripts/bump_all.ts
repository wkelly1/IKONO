// This script will update the version number of all sub-packages
import mainPackageJson from '../package.json';
import * as fs from 'fs';
import * as path from 'path';

// Update version for react library
const reactLocation = path.resolve('react', 'package.json');
fs.writeFileSync(
  reactLocation,
  JSON.stringify(
    {
      ...JSON.parse(fs.readFileSync(reactLocation).toString()),
      version: mainPackageJson.version
    },
    null,
    3
  )
);

// Update version.json in web package
const webLocation = path.resolve('web', 'version.json');
fs.writeFileSync(
  webLocation,
  JSON.stringify(
    {
      version: mainPackageJson.version
    },
    null,
    3
  )
);
