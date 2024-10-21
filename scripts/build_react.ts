import * as fs from 'fs';
import * as path from 'path';

const generatedMetaLoc = '.' + path.sep + 'output' + path.sep + 'meta.json';
const srcLoc = path.join('.', 'react', 'src');
const iconOutputLoc = path.join(srcLoc, 'icons');

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
    props: `{ color="currentColor", size="base", ...props }`
  };
}

function generateImports() {
  return "import React, { forwardRef } from 'react';\nimport { type IconProps } from '../types';\n\n";
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
          ? `return (<${snakeToCamel(
              name + variant.size
            )} ref={ref} color={color} {...props} />)`
          : `if (size === "${variant.size}") {
      return (<${snakeToCamel(
        name + variant.size
      )} ref={ref} color={color} {...props} />)
    }`
      )
      .join('\n')}
  });`;
}

function generateSubComponents(
  iconVariants: { size: string; jsx: string }[],
  name: string
) {
  return iconVariants
    .map(
      ({ size, jsx }) => `const ${snakeToCamel(
        name + size
      )}: React.FC<Omit<IconProps, 'size'>> = forwardRef(
  ({ color, ...props }, ref) => (${addKeysToSVG(updateColour(jsx))}));`
    )
    .join('\n\n');
}

function main() {
  console.log('\n------------------------------');
  console.log('----Building React Library----');

  // Clear out icons file
  if (fs.existsSync(iconOutputLoc)) {
    fs.rmSync(iconOutputLoc, { recursive: true });
  }
  fs.mkdirSync(iconOutputLoc);

  const imports = [];

  const meta = openMeta();
  for (const key of Object.keys(meta)) {
    const variants = Object.keys(meta[key].variants.standard).map(size => ({
      size,
      jsx: meta[key].variants.standard[size].jsx
    }));

    // Generate text for .js file
    const js =
      generateImports() +
      generateSubComponents(variants, key) +
      generateIconComponent(variants, key) +
      `\nexport default ${snakeToCamel(key)};`;

    fs.writeFile(
      iconOutputLoc + path.sep + snakeToCamel(key) + '.tsx',
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

  if (!fs.existsSync(iconOutputLoc)) {
    fs.mkdirSync(iconOutputLoc, { recursive: true });
  }

  fs.writeFile(srcLoc + path.sep + 'index.ts', indexjs, 'utf-8', err => {
    if (err) {
      console.log(err);
    }
  });
  console.log('------------Done--------------');
  console.log('------------------------------\n');
}

main();
