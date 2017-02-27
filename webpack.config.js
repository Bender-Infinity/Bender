const config = {
 entry: './client/App.jsx',
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
 }
};

module.exports = config;