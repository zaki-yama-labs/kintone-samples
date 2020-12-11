const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    config: "./src/main.ts",
  },
  output: {
    path: path.join(__dirname, "dist", "js"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new webpack.EnvironmentPlugin(["API_KEY", "CLIENT_ID", "CALENDAR_ID"]),
  ],
};
