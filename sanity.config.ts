"use client"

import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {schemaTypes} from "./sanity/schemaTypes"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "78xqw9ra"
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export default defineConfig({
  name: "committed-citizens",
  title: "Committed Citizens",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
