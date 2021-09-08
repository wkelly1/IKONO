const fs = require("fs");
const path = require("path");

const generatedMetaLoc =
  "." + path.sep + "output" + path.sep + "web" + path.sep + "meta.json";
const generatesIconJsLoc = "." + path.sep + "react" + path.sep + "icons";
const generatesIndexJsLoc = "." + path.sep + "react";

function snakeToCamel(str) {
  return str
    .toLowerCase()
    .replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace("-", "").replace("_", "")
    )
    .replace(/^\w/g, (group) => group.toUpperCase());
}

function openMeta() {
  // Check meta exists

  const fileExists = fs.existsSync(generatedMetaLoc);

  if (!fileExists) {
    console.log("Process Failed: meta.json file missing");
    return;
  }

  // Open Meta file
  const metaRaw = fs.readFileSync(generatedMetaLoc);
  return JSON.parse(metaRaw);
}

function main() {
  let imports = [];

  const meta = openMeta();
  for (let key of Object.keys(meta)) {
    // Generate text for .js file
    const js = `
    import React from 'react';
const ${snakeToCamel(key)} = () =>(
    ${meta[key].jsx}
);

export default ${snakeToCamel(key)};
    `;

    fs.writeFile(
      generatesIconJsLoc + path.sep + snakeToCamel(key) + ".js",
      js,
      "utf-8",
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );

    imports.push(snakeToCamel(key));
  }

  let indexjs =
    "import React from 'react';\n" +
    imports
      .map((value) => `import ${value} from "./icons/${value}";`)
      .join("\n");
  indexjs += `\n\nexport { ${imports.join(",")}} ;`;
  fs.writeFile(
    generatesIndexJsLoc + path.sep + "index.js",
    indexjs,
    "utf-8",
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

main();
