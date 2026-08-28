"use client"

import {defineConfig} from "sanity"
import {presentationTool} from "sanity/presentation"
import {structureTool} from "sanity/structure"
import {resolve} from "./sanity/presentation/resolve"
import {schemaTypes} from "./sanity/schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "78xqw9ra"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "committed-citizens",
  title: "Committed Citizens",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      resolve,
      previewUrl: {
        initial: "/insights",
        previewMode: {
          enable: "/api/draft-mode/enable",
          disable: "/api/draft-mode/disable",
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
