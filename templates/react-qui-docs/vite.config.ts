import mdx from "@mdx-js/rollup"
import {reactRouter} from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import {resolve} from "node:path"
import {defineConfig} from "vite"

import {
  frontmatterHmrPlugin,
  getRehypePlugins,
  getRemarkPlugins,
  quiDocsPlugin,
} from "@qualcomm-ui/mdx-vite"
import {
  resolveSemanticSearchPaths,
  semanticSearchDevPlugin,
} from "@qualcomm-ui/react-router-utils/node"

import quiDocsConfig from "./qui-docs.config.js"

export default defineConfig({
  plugins: [
    tailwindcss(),
    mdx({
      providerImportSource: "@mdx-js/react",
      rehypePlugins: [...getRehypePlugins()],
      remarkPlugins: [...getRemarkPlugins()],
    }),
    reactRouter(),
    quiDocsPlugin(),
    frontmatterHmrPlugin(),
    semanticSearchDevPlugin({
      outputDirectory: resolve(__dirname, "generated/semantic-search"),
      sectionsPath: resolveSemanticSearchPaths(quiDocsConfig.knowledge)
        .sectionsPath,
    }),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    noExternal: ["@qualcomm-ui/react-mdx", "react-shiki"],
  },
})
