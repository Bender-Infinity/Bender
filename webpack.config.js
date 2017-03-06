const config = {
  entry: './client/App.jsx',
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
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

module.exports = config;