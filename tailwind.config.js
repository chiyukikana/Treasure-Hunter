const registerImage = (name) => `url("/src/assets/icons/${name}")`;
const backgroundImage = {
  banner_pattern: registerImage("banner_pattern.png"),
  barrier: registerImage("barrier.png"),
  blaze_powder: registerImage("blaze_powder.png"),
  cancel: registerImage("cancel.png"),
  comparator: registerImage("comparator.png"),
  copper_ingot: registerImage("copper_ingot.png"),
  gold_ingot: registerImage("gold_ingot.png"),
  emerald: registerImage("emerald.png"),
  ender_pearl: registerImage("ender_pearl.png"),
  iron_ingot: registerImage("iron_ingot.png"),
  nether_star: registerImage("nether_star.png"),
  ok: registerImage("ok.png"),
  paper: registerImage("paper.png"),
  writable_book: registerImage("writable_book.png"),
};
const colors = {
  // 用于文字的颜色
  "th-black": "#252423",
  "th-white": "#F6F4F2",
  "th-lightgrey": "#BDBDBD",
  "th-grey": "#424242",
  "th-red": "#FF4B4B",
  "th-blue": "#61C3FF",
  "th-yellow": "#FBF38C",
  "th-mask": "rgba(0,0,0,0.65)",
  // 用于字块的颜色
  "th-char-turquoise": "#1abc9c",
  "th-char-green-sea": "#16a085",
  "th-char-emerald": "#2ecc71",
  "th-char-nephritis": "#27ae60",
  "th-char-peter-river": "#3498db",
  "th-char-belize-hole": "#2980b9",
  "th-char-amethyst": "#9b59b6",
  "th-char-wisteria": "#8e44ad",
  "th-char-wet-asphalt": "#34495e",
  "th-char-midnight-blue": "#2c3e50",
  "th-char-sun-flower": "#f1c40f",
  "th-char-orange": "#f39c12",
  "th-char-carrot": "#e67e22",
  "th-char-pumpkin": "#d35400",
  "th-char-alizarin": "#e74c3c",
  "th-char-clouds": "#ecf0f1",
  "th-char-silver": "#bdc3c7",
  "th-char-concrete": "#95a5a6",
  "th-char-asbestos": "#7f8c8d",
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts}"],
  theme: {
    backgroundImage,
    extend: {
      colors,
      fontFamily: {
        sans: ['"en"', '"cn"', "sans-serif"],
        serif: ['"en"', '"cn"', "serif"],
      },
      spacing: {
        144: "33rem",
        192: "44rem",
      },
    },
  },
  plugins: [],
};
