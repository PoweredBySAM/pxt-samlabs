const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname,"..", 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/', // Update this according to your project's structure
  },
  mode:"development",
  watch: true,
  experiments: {
    outputModule: true, // Enable output module experiment
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'src/index.html',
//       inject: false, // Set to false to manually inject the bundle
//     }),
//   ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};