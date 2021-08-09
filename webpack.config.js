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
  optimization: { minimize: false },
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
  config.module = {
    rules: [
      {
        test: /background\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'details.frameId !== 0',
          replace: '\/(cypress|integration|about:blank)\/.test(details.url)',
          flags: 'g',
          strict: true
        }
      }
    ]
  }
}

module.exports = config
