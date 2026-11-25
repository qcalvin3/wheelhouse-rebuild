import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  // Never lint built files or installed packages
  { ignores: ["dist/", "node_modules/"] },
  // ESLint's recommended rules: catches likely bugs like unused variables
  js.configs.recommended,
  {
    files: ["**/*.js"],
    // The site's code runs in the browser, so allow browser globals
    // like document and window
    languageOptions: { sourceType: "module", globals: globals.browser },
  },
  // Last: turns off ESLint's formatting rules so it never fights Prettier
  prettier,
];
