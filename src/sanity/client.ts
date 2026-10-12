import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  // Next caches the plates itself and the webhook refreshes them, so read straight from the API.
  // Sanity's CDN can still hold the old data for a moment after a publish, which would get
  // cached for hours.
  useCdn: false,
  perspective: "published",
});
