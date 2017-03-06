const config = {
  entry: './client/Index.jsx',
  output: {
    filename: 'bundle.js',
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