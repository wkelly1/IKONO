"use strict";

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { optimize } = require("svgo");
const svgtojsx = require("svg-to-jsx");

const iconOutputLoc = "." + path.sep + "output";
const metaOutputLoc = "." + path.sep + "output" + path.sep + "web" + path.sep;
const srcInputLoc = "." + path.sep + "src";

const convertCurrentColor = (svg) => {
  const reStroke = /stroke=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})("|')/g;
  const reFill = /fill=("|')#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})("|')/g;
  svg = svg.replaceAll(reStroke, "stroke='currentColor'");
  svg = svg.replaceAll(reFill, "fill='currentColor'");

  return svg;
};

async function main() {
  let metaOut = {};

  // Open Meta file
  const metaRaw = fs.readFileSync(srcInputLoc + path.sep + "meta.json");
  const meta = JSON.parse(metaRaw);

  for (let i = 0; i < Object.keys(meta).length; i++) {
    let key = Object.keys(meta)[i];

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
    const jsx = await svgtojsx(optimizedSvgString);

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
  console.log("Done");
}

try {
  main();
} catch (err) {
  console.log(err);
}
