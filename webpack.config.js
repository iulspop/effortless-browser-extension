const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')
const exec = require('child_process').exec
const createEntryPoints = require('./createEntryPoints')

const isTest = process.argv.includes('testing')

config = {
  mode: 'production',
  optimization: { minimize: false },
  entry: createEntryPoints('./extension'),
  output: {
    path: path.resolve(__dirname, 'dev-build'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: './extension',
          globOptions: {
            ignore: ['**/*.js', '**/*.scss'],
          },
        },
      ],
    }),
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
          exec('rm ./*-build/*-to-delete', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout)
            if (stderr) process.stderr.write(stderr)
          })
        })
      },
    },
  ],
}

if (isTest) {
  config.output.path = path.resolve(__dirname, 'test-build')
  config.module.rules.push({
    test: /background\.js$/,
    loader: 'string-replace-loader',
    options: {
      search: /(?<=^.*)/,
      replace: 'import "../../e2e/extension-command-listener.js"\n',
      strict: true,
    },
  })
}

module.exports = config
