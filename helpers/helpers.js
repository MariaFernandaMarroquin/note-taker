const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);
const writeToFile = util.promisify(fs.writeFile)

const readAndAppend = (content, file) => {
  return readFromFile(file, 'utf8');
};

module.exports = { readFromFile, writeToFile, readAndAppend };