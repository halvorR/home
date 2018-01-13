const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

const common = {
  entry: {
    app: ['babel-polyfill', PATHS.app]
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', loader: 'eslint-loader', options: { emitWarning: true } },
      { test: /\.js|.jsx$/, loader: 'babel-loader', options: { cacheDirectory: true } },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ]
};

const production = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader?sourceMaps'] },
      {
        test: /\.(scss)$/,
          use: [{
              loader: 'style-loader'
          },{
              loader: 'css-loader',
              options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[path]__[local]___[hash:base64:5]'
              }
          }, {
              loader: 'postcss-loader',
              options: {
                  sourceMap: true,
                  plugins: () => [
                      require('autoprefixer')({ browsers: ['last 2 versions'] })
                  ]
              }
          }, {
              loader: 'sass-loader',
              options: {
                  sourceMap: true,
                  includePaths: [path.join(__dirname, "src/scss")]
              }
          }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                publicPath: 'src/static/images/',
                outputPath: (name) => {
                    return name.replace("/static/images/", "");
                }
            }
        }]
      }
    ]
  },
  plugins: [
    // Output extracted CSS to a file
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true,
      }
    })
  ]
};

const development = {
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    // Force refresh if the hot reloading fails
    hot: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader?sourceMaps'] },
      {
        test: /\.(scss)$/,
          use: [{
              loader: 'style-loader'
          },{
              loader: 'css-loader',
              options: {
                  sourceMap: true,
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[path]__[local]___[hash:base64:5]'
              }
          }, {
              loader: 'postcss-loader',
              options: {
                  sourceMap: true,
                  plugins: () => [
                      require('autoprefixer')({ browsers: ['last 2 versions'] })
                  ]
              }
          }, {
              loader: 'sass-loader',
              options: {
                  sourceMap: true,
                  includePaths: [path.join(__dirname, "src/scss")]
              }
          }]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]',
                publicPath: '/src/static/images/',
                outputPath: (name) => {
                    return name.replace("src/static/images/", "");
                }
            }
        }]
    }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // This gives us friendly names for modules for debugging purposes
    new webpack.NamedModulesPlugin()
  ]
};

module.exports = function(env) {
  process.env.BABEL_ENV = env;

  const config = env === 'production' ? production : development;

  return Object.assign(
    {},
    common,
    config,
    {
      plugins: common.plugins.concat(config.plugins)
    }, {
      module: {
        rules: common.module.rules.concat(config.module.rules)
      }
    }
  );
};
