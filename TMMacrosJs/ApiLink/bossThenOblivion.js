let logz;
try {
  // Try to require the "../dist/TMLogger" module
  ({ logz } = require("../dist/TMLogger"));
} catch (error) {
  // If an error occurs, require the "../TMLogger" module instead
  ({ logz } = require("../TMLogger"));
  logz("WARNING: Could not find TMLogger.js, so using TMLogger.ts instead. This will increase launch times.\nPossible Solution: use tsc --outdir dist")
}

process.on('uncaughtException', (e) => {
  logz(e.stack);
});

let API;
try {
  // Try to require the "../dist/API" module
  ({ API } = require('../dist/API'));
} catch (error) {
  // If an error occurs, require the "../API" module instead
  ({ API } = require('../API'));
}

const path = require("path");

const fileName = path.parse(__filename).name;
const oldCWD = process.cwd();
const newCWD = path.dirname(__filename);
process.chdir(newCWD);
API[fileName]();
process.chdir(oldCWD);