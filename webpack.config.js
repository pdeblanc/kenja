const path = require("path");
module.exports = {
  entry: ["./src/main.js"],
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
