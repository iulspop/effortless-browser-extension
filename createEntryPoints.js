const fs = require('fs');
const path = require('path');

function createEntryPoints(dir) {
  let fileList = walkSync(dir);
  let entryPointsPaths = fileList.filter(path => /\.js$/.test(path))
                                  .filter(path => !/utils/.test(path));

  let entry = {};
  entryPointsPaths.forEach(path => {
    let entryName  = path.match(/(?<=\/)[^\/]+(?=\.js)/)[0];
    let importPath = './' + path
    let buildPath  = path.slice(path.indexOf('/') + 1);
    entry[entryName] = { import: importPath, filename: buildPath};
  })

  return entry
}

function walkSync(dir, fileList = []) {
  fs.readdirSync(dir).forEach(file => {

    fileList = (
    fs.statSync(path.join(dir, file)).isDirectory()
      ? walkSync(path.join(dir, file), fileList)
      : fileList.concat(path.join(dir, file))
    );

  });
  return fileList;
}

module.exports = createEntryPoints;