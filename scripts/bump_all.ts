import mainPackageJson from '../package.json';
import * as fs from 'fs';
import * as path from 'path';

console.log(mainPackageJson);

const location = path.resolve('react', 'package.json');
fs.writeFileSync(
  location,
  JSON.stringify(
    {
      ...JSON.parse(fs.readFileSync(location).toString()),
      version: mainPackageJson.version
    },
    null,
    3
  )
);
