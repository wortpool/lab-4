import js from "@eslint/js";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "docs/**"],
  },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        document: "readonly",
        window: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "no-console": "warn",
    },
  },
];
