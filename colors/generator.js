const Color = require("color");
const names = require("./names");

module.exports = {
  getHslString: (color) => {
    return color[0] + " " + color[1] + "%" + " " + color[2] + "%";
  },

  generateContentColor: function (input, percentage = 0.8) {
    let c = Color(input).isDark() ? Color("white") : Color("black");
    let arr = Color(input)
      .mix(c, percentage)
      .saturate(10)
      .hsl()
      .round()
      .array();
    return this.getHslString(arr);
  },

  convertToHsl: function (input) {
    let resultObj = {};
    if (typeof input === "object" && input !== null) {
      Object.entries(input).forEach(([rule, value]) => {
        if (names.hasOwnProperty(rule)) {
          const hslArray = Color(value).hsl().round().array();
          resultObj[names[rule]] = this.getHslString(hslArray);
        } else {
          resultObj[rule] = value;
        }
        let entries = [
          ["primary", "--p"],
          ["secondary", "--s"],
          ["accent", "--a"],
          ["neutral", "--n"],
          ["info", "--in"],
          ["success", "--su"],
          ["warning", "--wa"],
          ["error", "--er"],
        ];

        entries.forEach(([value, flag]) => {
          if (!input.hasOwnProperty(value + "-focus")) {
            const darkerHslArray = Color(input[value])
              .darken(0.2)
              .hsl()
              .round()
              .array();
            resultObj[flag + "f"] = this.getHslString(darkerHslArray);
          }
        });

        entries.forEach(([value, flag]) => {
          if (!input.hasOwnProperty(value + "-content")) {
            resultObj[flag + "c"] = this.generateContentColor(input[value]);
          }
        });

        if (!input.hasOwnProperty("base")) {
          input["base"] = "#808080";
        }
        const multipliers = [16, 14, 12, 11, 9, 8, 7, 5, 0];
        const base = Color(input["base"]).hsl().round().array();
        const m = Color(input["base"]).isDark() ? 1 : -1;
        for (let i = 1; i <= 9; i++) {
          resultObj["--b" + i] = this.getHslString([
            base[0],
            base[1],
            base[2] + m * multipliers[i - 1],
          ]);
        }
        if (!input.hasOwnProperty("base-content")) {
          resultObj["--bc"] = this.generateContentColor(input["base"]);
        }
      });
      return resultObj;
    }
    return input;
  },

  injectThemes: function (addBase, config, themes) {
    let includedThemesObj = {};
    let allThemes = { ...themes, ...config("easyThemes") };
    Object.entries(allThemes).forEach(([customThemeName, customThemeValue]) => {
      includedThemesObj["[theme=" + customThemeName + "]"] =
        this.convertToHsl(customThemeValue);
    });

    let themeOrder = [];
    Object.entries(allThemes).forEach(([customThemeName]) => {
      themeOrder.push(customThemeName);
    });

    themeOrder.forEach((themeName, index) => {
      if (index === 0) {
        addBase({
          [":root"]: includedThemesObj["[theme=" + themeName + "]"],
        });
      } else if (index === 1) {
        addBase({
          ["[theme=" + themeOrder[0] + "]"]:
            includedThemesObj["[theme=" + themeOrder[0] + "]"],
        });
        addBase({
          ["[theme=" + themeOrder[1] + "]"]:
            includedThemesObj["[theme=" + themeOrder[1] + "]"],
        });
      } else {
        addBase({
          ["[theme=" + themeName + "]"]:
            includedThemesObj["[theme=" + themeName + "]"],
        });
      }
    });

    return {
      includedThemesObj: includedThemesObj,
      themeOrder: themeOrder,
    };
  },
};
