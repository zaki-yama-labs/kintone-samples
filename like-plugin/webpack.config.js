const path = require("path");

module.exports = {
  entry: {
    config: "./src/config/index.tsx"
  },
  output: {
    path: path.join(__dirname, "build", "js")
  },

  devServer: {
    host: "0.0.0.0",
    port: 7777
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
