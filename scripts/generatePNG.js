"use strict";

/* Generates PNGs for all of the icons and creates the main meta file */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const srcInputLoc = "." + path.sep + "src";
const iconOutputLoc = "." + path.sep + "output" + path.sep + "web";

async function main() {
  let metaOut = {};

  // Open Meta file
  const metaRaw = fs.readFileSync(srcInputLoc + path.sep + "meta.json");
  const meta = JSON.parse(metaRaw);

  if (!fs.existsSync(iconOutputLoc)) {
    fs.mkdirSync(iconOutputLoc);
    console.log("- Created web folder");
  } else {
    console.log("Directory already exists.");
  }

  fs.mkdirSync(iconOutputLoc + path.sep + "png");

  if (!fs.existsSync(iconOutputLoc + path.sep + "png")) {
    fs.mkdirSync(iconOutputLoc + path.sep + "png");
    console.log("- Created PNG folder");
  } else {
    console.log("Directory already exists.");
  }

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
