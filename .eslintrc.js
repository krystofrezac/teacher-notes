module.exports = {
  extends: [
    "airbnb",
    "next/core-web-vitals",
    "./node_modules/@blitzjs/next/eslint",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  rules: {
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^react$"],
          ["^@?\\w"],
          ["^app"],
          ["^\\u0000"],
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ["^.+\\.s?css"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",

    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      extends: [
        "airbnb",
        "airbnb-typescript",
        "next/core-web-vitals",
        "./node_modules/@blitzjs/next/eslint",
        "plugin:prettier/recommended",
      ],
      rules: {
        "no-use-before-define": "off",
        "consistent-return": "off",
        "newline-before-return": "error",

        "jsx-a11y/anchor-is-valid": "off",
        "jsx-a11y/label-has-associated-control": "off", // false positive

        "react/function-component-definition": "off",
        "react/destructuring-assignment": "off",
        "react/button-has-type": "off",
        "react/jsx-props-no-spreading": "off",
        "react/require-default-props": "off",

        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/default-param-last": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_", ignoreRestSiblings: true },
        ],
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
    {
      files: ["**/*.js"],
      rules: {
        "global-require": "off",
      },
    },
    {
      files: ["test/**/*"],
      env: {
        jest: true,
      },
      rules: {
        "import/no-extraneous-dependencies": "off",
      },
    },
    {
      files: ["./pages/**/*.{ts,tsx}"],
      rules: {
        "no-restricted-exports": "off",
      },
    },
  ],
}
