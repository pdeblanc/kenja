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
      },
      {
        test: /\.(s*)css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader'},
          {loader: 'sass-loader'},
        ]
      }
    ]
  },
  devServer: {
    publicPath: '/static',
    port: 8080
  }
};
