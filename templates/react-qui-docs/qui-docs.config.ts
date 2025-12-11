import type {QuiDocsConfig} from "@qualcomm-ui/mdx-vite"

export default {
  appDirectory: "src",
  navConfig: [
    {
      id: "_index",
      title: "Home",
    },
  ],
  pageDirectory: "routes",
  pageTimestampMetadata: "user-and-timestamp",
} satisfies QuiDocsConfig
