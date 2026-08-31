import type {QuiDocsConfig} from "@qualcomm-ui/mdx-vite"

export default {
  appDirectory: "src",
  disableLegacySearchIndex: true,
  knowledge: {
    // TODO: uncomment this line and add your app's baseUrl
    // baseUrl: ""
  },
  navConfig: [
    {
      id: "_index",
      title: "Home",
    },
  ],
  pageDirectory: "routes",
} satisfies QuiDocsConfig
