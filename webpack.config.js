const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const path = require('path')
const exec = require('child_process').exec
const createEntryPoints = require('./createEntryPoints')

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

module.exports = config
