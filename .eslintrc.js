/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    project: ["./ts.config.json"],
    extraFileExtensions: [".vue"],
  },
  ignorePatterns: [
    ".eslintrc.js",
    "postcss.config.js",
    "vite.config.js",
    "tailwind.config.js",
  ],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-undef": "off",
  },
};
