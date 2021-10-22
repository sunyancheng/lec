const { smart } = require("webpack-merge");
const base = require("./webpack.config");

module.exports = smart(base, {
  entry: "./src/test.tsx",

  mode: "development",
  devtool: "inline-soruce-map",
});
