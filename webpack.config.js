/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "tnt.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      runtime: path.resolve(__dirname, "src/runtime"),
      plugins: path.resolve(__dirname, "src/plugins"), 
    },
  },
  devServer: {
    allowedHosts: ["all"],
  }
};
