"use strict";

/* Generates PNGs for all of the icons and creates the main meta file */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const srcInputLoc = "." + path.sep + "src";
// const iconOutputLoc = "." + path.sep + "output" + path.sep + "web";
const iconOutputLoc =
  "." + path.sep + "web" + path.sep + "public" + path.sep + "icons" + path.sep;

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

    console.log(" - Converting to PNG");
    // Convert SVG to PNG
    try {
      await sharp(srcInputLoc + path.sep + "icons" + path.sep + key + ".svg")
        .png()
        .toFile(iconOutputLoc + path.sep + "png" + path.sep + key + ".png");
    } catch (err) {
      console.log(
        "Process Failed: Could not convert to png for file '" + key + ".svg'"
      );
      return;
    }
  }
}

main();
