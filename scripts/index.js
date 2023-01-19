"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { optimize } = require("svgo");
const svgtojsx = require("svg-to-jsx");

const iconOutputLoc = "." + path.sep + "output";
const metaOutputLocWeb = "." + path.sep + "web" + path.sep;
const metaOutputLoc = "." + path.sep + "output" + path.sep;
const srcInputLoc = "." + path.sep + "src";

const convertCurrentColor = (svg) => {
  const reStroke = /stroke=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})("|')/g;
  const reFill = /fill=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})("|')/g;

  svg = svg.replaceAll(reStroke, "stroke='currentColor'");
  svg = svg.replaceAll(reFill, "fill='currentColor'");

  return svg;
};

const convertToJSX = (svg) => {
  return svg.replaceAll(/[a-z]*-[a-z]*=/g, (group) =>
    group[group.indexOf("-") + 1].toUpperCase().replace("-", "")
  );
};

function openMeta() {
  // Check meta exists

  const fileExists = fs.existsSync(srcInputLoc + path.sep + "meta.json");

  if (!fileExists) {
    console.log("Process Failed: meta.json file missing");
    return;
  }

  if (!fs.existsSync("." + path.sep + "output")) {
    fs.mkdirSync("." + path.sep + "output");
    console.log("- Created output folder");
  } else {
    console.log("Directory already exists.");
  }

  // Open Meta file
  const metaRaw = fs.readFileSync(srcInputLoc + path.sep + "meta.json");
  return JSON.parse(metaRaw);
}

function updateMeta(meta) {
  fs.writeFileSync(
    srcInputLoc + path.sep + "meta.json",
    JSON.stringify(meta, null, 2)
  );
}

async function main() {
  let metaOut = {};

  let files = fs.readdirSync(srcInputLoc + path.sep + "icons");
  files = files
    .filter((file) => path.extname(file).toLowerCase() === ".svg")
    .map((file) => path.parse(file).name);

  const meta = openMeta();

  // Add any missing values to meta
  files.forEach((file) => {
    if (!meta[file]) {
      console.log(`meta missing key ${file} - adding`);
      meta[file] = [];
    }
  });

  updateMeta(meta);

  for (let i = 0; i < files.length; i++) {
    // let key = Object.keys(meta)[i];
    let key = files[i];

    console.log("Converting: " + key + ".svg");
    // Check if SVG exists

    const fileExists = fs.existsSync(
      srcInputLoc + path.sep + "icons" + path.sep + key + ".svg"
    );

    if (!fileExists) {
      console.log("Process Failed: SVG missing for file '" + key + ".svg'");
      return;
    }

    // console.log(" - Creating output folder");
    // let dir = iconOutputLoc + path.sep + key;
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    //   console.log("- Created output folder");
    // } else {
    //   console.log("Directory already exists.");
    // }

    // console.log(" - Converting to PNG");
    // // Convert SVG to PNG
    // try {
    //   await sharp(srcInputLoc + path.sep + "icons" + path.sep + key + ".svg")
    //     .png()
    //     .toFile(iconOutputLoc + path.sep + "png" + path.sep + key + ".png");
    // } catch (err) {
    //   console.log(
    //     "Process Failed: Could not convert to png for file '" + key + ".svg'"
    //   );
    //   return;
    // }

    const data = fs.readFileSync(
      srcInputLoc + path.sep + "icons" + path.sep + key + ".svg",
      { encoding: "utf-8" }
    );
    console.log(" - Optimizing");

    const result = optimize(data, {
      // optional but recommended field
      path: srcInputLoc + path.sep + "icons" + path.sep + key + ".svg",
      // all config fields are also available here
      multipass: true,
      fill: { name: "fill", value: "currentColor" },
    });

    let optimizedSvgString = convertCurrentColor(result.data);
    console.log(" - Converting to JSX");
    let jsx = await svgtojsx(optimizedSvgString);
    jsx = convertToJSX(jsx);

    console.log(" - Saving file: " + iconOutputLoc + path.sep + key + ".svg");
    console.log(optimizedSvgString);
    fs.writeFile(
      iconOutputLoc + path.sep + key + ".svg",
      optimizedSvgString,
      "utf-8",
      (err) => {
        if (err) {
          console.log("Error: " + err);
        }
      }
    );

    console.log(" - Updating Meta");
    let keyMetaData = {
      tags: meta[key],
      svg: optimizedSvgString,
      jsx: jsx,
    };
    metaOut[key] = keyMetaData;
    console.log(" - Moving on");
  }

  // console.log(metaOut);

  let out = {};
  let sorted = Object.keys(metaOut).sort();
  sorted.forEach((value) => {
    out[value] = metaOut[value];
  });
  const metaOutJson = JSON.stringify(out);
  // console.log(metaOutJson);
  fs.writeFile(metaOutputLoc + "meta.json", metaOutJson, "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
  fs.writeFile(metaOutputLocWeb + "meta.json", metaOutJson, "utf-8", (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log("Done");
}

try {
  main();
} catch (err) {
  console.log(err);
}
