const ForkTSCheckerPlugin = require('fork-ts-checker-webpack-plugin')
const HTMLPlugin = require('html-webpack-plugin')
const { HotModuleReplacementPlugin } = require('webpack')
const Path = require('path')

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = (env, argv) => {
  return {
    context: Path.resolve(__dirname),
    entry: './src/index.tsx',
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : false,
    output: {
      filename: '[name]-[chunkhash].js',
      path: Path.resolve(__dirname, 'assets'),
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                    development: !env.production,
                  },
                ],
                '@babel/typescript',
              ],
              plugins: ['@babel/plugin-syntax-top-level-await'],
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
      new HTMLPlugin(),
      new ForkTSCheckerPlugin({
        typescript: {
          mode: 'write-references',
        },
      }),
      new HotModuleReplacementPlugin(),
    ],
    experiments: {
      topLevelAwait: true,
    },
  }
}
