const tintColorLight = '#3D5A80';
const tintColorDark = '#E0FBFC';
const bgPrimary = '#E0FBFC'
const bgSecondary = '#293241'
const alert = '#EE6C4D'


export default {
  light: {
    text: bgSecondary,
    background: bgPrimary,
    tint: tintColorLight,
    tabIconDefault: "#98c1d9",
    tabIconSelected: "#EE6C4D",
    alert: alert
  },
  dark: {
    text: bgPrimary,
    background: bgSecondary,
    tint: tintColorDark,
    tabIconDefault: tintColorLight,
    tabIconSelected: tintColorDark,
    alert: alert
  },
};
