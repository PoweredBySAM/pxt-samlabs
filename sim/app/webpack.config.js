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
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
          'ts-loader',
        ]
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