import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Allow 'any' type when explicitly needed (but discourage it)
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Allow unused vars with underscore prefix
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      
      // Allow unescaped entities in JSX (apostrophes, quotes, etc.)
      "react/no-unescaped-entities": "off",
      
      // Ensure alt text for images (accessibility)
      "jsx-a11y/alt-text": "error",
      
      // Catch potential runtime errors
      "no-undef": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Code quality
      "prefer-const": "error",
      "no-var": "error",
    }
  }
];

export default eslintConfig;
