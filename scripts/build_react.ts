import * as fs from 'fs';
import * as path from 'path';

const generatedMetaLoc = '.' + path.sep + 'output' + path.sep + 'meta.json';
const generatesIconJsLoc = '.' + path.sep + 'react' + path.sep + 'icons';
const generatesIndexJsLoc = '.' + path.sep + 'react';

function snakeToCamel(str: string) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, group =>
      group.toUpperCase().replace('-', '').replace('_', '')
    )
    .replace(/^\w/g, group => group.toUpperCase());
}

function openMeta() {
  // Check meta exists

  const fileExists = fs.existsSync(generatedMetaLoc);

  if (!fileExists) {
    console.log('Process Failed: meta.json file missing');
    return;
  }

  // Open Meta file
  const metaRaw = fs.readFileSync(generatedMetaLoc);
  return JSON.parse(metaRaw.toString());
}

function generateProps() {
  return {
    type: `export interface IconProps extends React.ComponentPropsWithRef<'svg'> {
      color: string,
      size: "sm" | "base"
    }`,
    props: `{ color, size, ...props }`
  };
}

function generateImports() {
  return "import React, { forwardRef } from 'react';\n";
}

function updateColour(svg: string) {
  return svg.replaceAll('"currentColor"', '{color}');
}

function addKeysToSVG(svg: string) {
  const endChar = svg.indexOf('>');

  return (
    svg.substring(0, endChar) + ' ref={ref} {...props}' + svg.substring(endChar)
  );
}

function generateIconComponent(
  iconVariants: { size: string; jsx: string }[],
  name: string
) {
  const { props } = generateProps();
  iconVariants.push(
    iconVariants.splice(
      iconVariants.findIndex(variant => variant.size === 'base'),
      1
    )[0]
  );
  return `const ${snakeToCamel(
    name
  )}: React.FC<IconProps> = forwardRef((${props}, ref) => {
    ${iconVariants
      .map(variant =>
        variant.size === 'base'
          ? `return (${addKeysToSVG(updateColour(variant.jsx))})`
          : `if (size === "${variant.size}") {
      return (${addKeysToSVG(updateColour(variant.jsx))})
    }`
      )
      .join('\n')}
  });`;
}

function main() {
  console.log('\n------------------------------');
  console.log('----Building React Library----');

  // Clear out icons file
  fs.rmdirSync(generatesIconJsLoc, { recursive: true });
  fs.mkdirSync(generatesIconJsLoc);

  const imports = [];

  const meta = openMeta();
  for (const key of Object.keys(meta)) {
    // Generate text for .js file
    const js =
      generateImports() +
      generateProps().type +
      generateIconComponent(
        Object.keys(meta[key].variants.standard).map(size => ({
          size,
          jsx: meta[key].variants.standard[size].jsx
        })),
        key
      ) +
      `\nexport default ${snakeToCamel(key)};`;

    fs.writeFile(
      generatesIconJsLoc + path.sep + snakeToCamel(key) + '.tsx',
      js,
      'utf-8',
      err => {
        if (err) {
          console.log(err);
        }
      }
    );

    imports.push(snakeToCamel(key));
  }

  let indexjs =
    "import React from 'react';\n" +
    imports.map(value => `import ${value} from "./icons/${value}";`).join('\n');
  indexjs += `\n\nexport { ${imports.join(',')}} ;`;

  if (!fs.existsSync(generatesIconJsLoc)) {
    fs.mkdirSync(generatesIconJsLoc, { recursive: true });
  }

  fs.writeFile(
    generatesIndexJsLoc + path.sep + 'index.ts',
    indexjs,
    'utf-8',
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
  console.log('------------Done--------------');
  console.log('------------------------------\n');
}

main();
