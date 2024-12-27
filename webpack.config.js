const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'WeatherApp',
      template : '/src/index.html'
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer : {
     static : './dist' ,
     watchFiles : './src/index.html',
  } , 
  devtool: 'inline-source-map',
  mode : 'development' ,

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
