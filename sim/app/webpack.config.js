const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "..", "public", "dist"),
    filename: "bundle.js",
    publicPath: "dist/",
  },
  mode: "production",
  watch: false,
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [
                ["@babel/plugin-proposal-decorators", { legacy: true }],
                ["@babel/plugin-proposal-class-properties", { loose: true }],
              ],
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
};

//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'src/index.html',
//       inject: false, // Set to false to manually inject the bundle
//     }),
//   ],
