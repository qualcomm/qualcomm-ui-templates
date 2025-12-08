import {defineConfig, globalIgnores} from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import * as tseslint from "typescript-eslint"

import quiEslintReact from "@qualcomm-ui/eslint-config-react"
import quiEslintTs from "@qualcomm-ui/eslint-config-typescript"

const tsLanguageOptions = {
  parser: tseslint.parser,
  parserOptions: {
    projectService: true,
  },
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "**/coverage/",
    "**/temp/",
  ]),
  // JS
  {
    extends: [
      quiEslintTs.configs.base,
      quiEslintTs.configs.sortKeys,
      quiEslintTs.configs.styleGuide,
    ],
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
  },
  // TS
  {
    extends: [
      ...quiEslintTs.configs.recommended,
      quiEslintTs.configs.performance,
      quiEslintTs.configs.strictExports,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
  // React
  {
    extends: [
      ...quiEslintTs.configs.recommended,
      quiEslintTs.configs.performance,
      quiEslintReact.configs.base,
      quiEslintReact.configs.recommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: tsLanguageOptions,
  },
])

export default eslintConfig
