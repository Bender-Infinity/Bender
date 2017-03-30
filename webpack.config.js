var webpack = require('webpack');
//var CompressionPlugin = require('compression-webpack-plugin');

const config = {
  entry: './client/Index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/public',
    path: __dirname + '/public'
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
  // plugins: [
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   }),
  //   new webpack.optimize.UglifyJsPlugin(),
  //   new webpack.optimize.AggressiveMergingPlugin(),
  //   new CompressionPlugin({
  //     asset: "[path].gz[query]",
  //     algorithm: "gzip",
  //     test: /\.js$|\.css$|\.html$/,
  //     threshold: 10240,
  //     minRatio: 0.8
  //   })
  // ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;