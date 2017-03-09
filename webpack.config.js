var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

const config = {
  entry: './client/Index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/public',
    path: './public'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["react", "es2015"]
        }  
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks
    new CompressionPlugin({//   <-- Add this
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;