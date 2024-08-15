#!/bin/bash

const fs = require('fs');

function getCurrentFilenames() {
  console.log("Current filenames:");
  fs.readdirSync(__dirname).forEach(file => {

    const newFile = file.replace('Untitled ', '')
    fs.rename(file, newFile, () => {
      console.log("\nFile Renamed!\n");
      getCurrentFilenames();
    })
  })
}
getCurrentFilenames();