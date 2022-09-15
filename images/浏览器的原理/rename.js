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
getCurrentFilenames();<link rel="stylesheet" href="/css/spoiler.css" type="text/css"><script src="/js/spoiler.js" type="text/javascript" async></script>