const path = require("path");

module.exports = {
  entry: path.resolve(__dirname + "/src/userhut.js"),
  output: {
    path: path.resolve(__dirname + "/dist/"),
    filename: "userhut.js",
    library: "Userhut",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
