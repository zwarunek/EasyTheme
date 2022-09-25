function withOpacityValue(variable, fallbackColor) {
  return ({ opacityValue }) => {
    let fallbackColorValue = "";
    if (fallbackColor) {
      fallbackColorValue = `, var(${fallbackColor})`;
    }
    if (opacityValue === undefined) {
      return `hsl(var(${variable}${fallbackColorValue}))`;
    }
    return `hsl(var(${variable}${fallbackColorValue}) / ${opacityValue})`;
  };
}

let colorObject = {
  transparent: "transparent",

  primary: {
    DEFAULT: withOpacityValue("--p"),
    focus: withOpacityValue("--pf"),
    content: withOpacityValue("--pc"),
  },

  secondary: {
    DEFAULT: withOpacityValue("--s"),
    focus: withOpacityValue("--sf"),
    content: withOpacityValue("--sc"),
  },

  accent: {
    DEFAULT: withOpacityValue("--a"),
    focus: withOpacityValue("--af", "--a"),
    content: withOpacityValue("--ac"),
  },

  neutral: {
    DEFAULT: withOpacityValue("--n"),
    focus: withOpacityValue("--nf", "--n"),
    content: withOpacityValue("--nc"),
  },

  base: {
    DEFAULT: withOpacityValue("--b1"),
    100: withOpacityValue("--b1"),
    200: withOpacityValue("--b2"),
    300: withOpacityValue("--b3"),
    400: withOpacityValue("--b4"),
    500: withOpacityValue("--b5"),
    600: withOpacityValue("--b6"),
    700: withOpacityValue("--b7"),
    800: withOpacityValue("--b8"),
    900: withOpacityValue("--b9"),
    content: withOpacityValue("--bc"),
  },

  info: {
    DEFAULT: withOpacityValue("--in"),
    focus: withOpacityValue("--inf"),
    content: withOpacityValue("--inc", "--nc"),
  },
  success: {
    DEFAULT: withOpacityValue("--su"),
    focus: withOpacityValue("--suf"),
    content: withOpacityValue("--suc", "--nc"),
  },

  warning: {
    DEFAULT: withOpacityValue("--wa"),
    focus: withOpacityValue("--waf", "--wa"),
    content: withOpacityValue("--wac", "--nc"),
  },

  error: {
    DEFAULT: withOpacityValue("--er"),
    focus: withOpacityValue("--erf", "--er"),
    content: withOpacityValue("--erc", "--nc"),
  },
};

module.exports = colorObject;
