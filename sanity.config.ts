"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas/plate";

export default defineConfig({
  name: "aqib-plates",
  title: "Aqib Plates",
  basePath: "/studio",
  projectId: projectId || "unconfigured",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Plates for sale")
              .child(S.documentList().title("Plates for sale").filter('_type == "plate" && status != "sold"')),
            S.listItem()
              .title("Sold plates")
              .child(S.documentList().title("Sold plates").filter('_type == "plate" && status == "sold"')),
            S.divider(),
            S.documentTypeListItem("plate").title("All plates"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
