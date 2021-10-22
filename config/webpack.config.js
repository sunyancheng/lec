// 清理产出目录的插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//  产出 html 的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  output: {
    // 输出目录
    path: path.resolve(__dirname, "../dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  devServer: {
    contentBase: "../dist",
    inline: true,

    host: "127.0.0.1",
    port: 8080,
  },
  module: {
    rules: [
      // {
      //   test: /\.(j|t)sx?/,
      //   use: "ts-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(js|jsx|tsx?)$/, //一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx以及tsx文件（必须）
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-optional-chaining"],
              ["@babel/plugin-syntax-jsx"],
            ],
          },
        }, //loader的名称（必须）
        exclude: /node_modules/, //屏蔽不需要处理的文件（文件夹）（可选）
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve("url-loader"),
        options: {
          limit: 100,
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
            options: {
              modules: {
                mode: "global",
                exportGlobals: true,
                localIdentName: "[name]__[local]__[hash:base64:5]",
              },
              importLoaders: 1,
            },
          },
          {
            loader: "less-loader", // compiles Less to CSS
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./dist"],
    }),
    new HtmlWebpackPlugin({
      template: "./template/index.html",
    }),
  ],
};
