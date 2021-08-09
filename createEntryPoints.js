const fs = require('fs');
const path = require('path');

function createEntryPoints(dir) {
  let fileList = walkSync(dir);
  return { ...createEntryPointsJS(fileList), ...createEntryPointsSCSS(fileList) }
}

function createEntryPointsJS(fileList) {
  let entryPointsPaths = fileList.filter(path => /\.js$/.test(path))
                                 .filter(path => !/utils/.test(path));

  let entries = {};
  entryPointsPaths.forEach(path => {
    let entryName  = path.match(/(?<=\/)[^\/]+(?=\.js)/)[0];
    let importPath = './' + path
    let buildPath  = path.slice(path.indexOf('/') + 1);
    entries[entryName] = { import: importPath, filename: buildPath};
  })

  entries.background.filename = 'background.js';
  return entries
}

function createEntryPointsSCSS(fileList) {
  let entryPointsPaths = fileList.filter(path => /\.scss$/.test(path))

  let entries = {};
  entryPointsPaths.forEach(path => {
    let entryName  = path.match(/(?<=\/)[^\/]+(?=\.scss)/)[0] + "-styles";
    let importPath = './' + path
    let buildPath  = path.slice(path.indexOf('/') + 1).replace('.scss', '')
    entries[buildPath] = { import: importPath, filename: entryName + '-to-delete'};
  })

  return entries
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