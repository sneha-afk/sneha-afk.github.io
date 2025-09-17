import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    plugins: {
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      eqeqeq: "error",
      "no-console": ["warn", { allow: ["error", "warn"] }],
      "prefer-const": "error",
      "consistent-return": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "react/jsx-boolean-value": "warn",
      "react/jsx-no-useless-fragment": "warn",
      "react/self-closing-comp": "warn",
      "import/order": [
        "warn",
        { groups: [["builtin", "external", "internal"]] },
      ],
      "unused-imports/no-unused-imports": "error",
    },
  },
]);
