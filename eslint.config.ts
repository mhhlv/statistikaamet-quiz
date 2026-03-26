import globals from "globals";
import eslintTS from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react";
import eslintJSON from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslintTS.configs.recommended,
  { 
    ...eslintPluginReact.configs.flat['recommended'],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off"
    },
    files: ["**/*.{jsx,tsx}"],
    settings: { react: { version: "detect" } },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["**/*.json"],
    plugins: { json: eslintJSON },
    language: "json/json",
  },
]);
