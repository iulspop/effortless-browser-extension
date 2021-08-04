const path = require('path');
const createEntryPoints = require('./createEntryPoints');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "production",
  entry: createEntryPoints('./extension'),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./extension",
          globOptions: {
            ignore: ["**/*.js"]
          }
        }
      ]
    })
  ],
};
