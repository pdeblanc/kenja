const path = require("path");
module.exports = {
  entry: ["./src/main.js"],
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "js/bundle.js"
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
  },
  devServer: {
    publicPath: '/static',
    port: 8080
  }
};
