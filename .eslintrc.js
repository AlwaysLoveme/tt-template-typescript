module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
    "max-len": ["off"],
    "no-undef": ["off"],
    "no-unused-vars": ["off"],
    quotes: ["error", "double"],
    "no-console": ["off"],
    "no-useless-return": ["off"],
    "no-param-reassign": ["off"],
    "no-var": ["off"],
    "function-names": ["off"],
    "import/no-extraneous-dependencies": ["off"],
    "import/no-unresolved": [
      2,
      {
        ignore: [
          "tt-api-typings",
        ],
      }],
  },
};
