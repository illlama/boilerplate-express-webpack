const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // entry files
  entry: ["@babel/polyfill", "./src/js/index.js", "./src/sass/style.scss"],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, "public"), // bundle만들어질 장소
    filename: "js/index_bundle.js", // bundle 될 파일 이름
    publicPath: "http://localhost:3000/public" //웹팩 미들웨어 장소
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    // MiniCssExtractPlugin 은 배포할때 사용하면 좋음.
    // new MiniCssExtractPlugin({ filename: "./css/style.css" }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"]
    })
  ],
  devtool: "source-map",
  mode: "development"
};
