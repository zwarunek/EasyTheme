const colors = require("./colors");
const themes = require("./colors/themes");
const colorFunctions = require("./colors/generator");
const plugin = require("tailwindcss/plugin");

function generate({ addBase, config }) {
  colorFunctions.injectThemes(addBase, config, themes);
}
const gen = plugin(generate, { theme: { extend: { colors } } });
module.exports = gen;
