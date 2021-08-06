const path = require('path');
const createEntryPoints = require('./createEntryPoints');
const CopyPlugin = require("copy-webpack-plugin");

const isTest = process.argv.includes('testing');

config = {
  mode: "production",
  entry: createEntryPoints('./extension'),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dev-build')
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

if (isTest) {
  config.output.path = path.resolve(__dirname, 'test-build')
  config.optimization = { minimize: false }
  config.module = {
    rules: [
      {
        test: /background\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'details.frameId !== 0',
          replace: 'details.url !== "https://duckduckgo.com/?q=turtle&ia=web"',
          flags: 'g',
          strict: true
        }
      }
    ]
  }
}

module.exports = config