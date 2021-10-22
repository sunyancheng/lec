const { smart } = require("webpack-merge");
const base = require("./webpack.config");

module.exports = smart(base, {
  mode: "production",
});
