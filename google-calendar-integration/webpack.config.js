const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    config: "./src/main.tsx"
  },
  output: {
    path: path.join(__dirname, "dist", "js"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  }
};
