import "server-only";
import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

const token = process.env.SANITY_API_WRITE_TOKEN;

/** Null unless Sanity and a write token are configured (needed to reserve and mark plates sold). */
export const writeClient =
  isSanityConfigured && token ? createClient({ projectId, dataset, apiVersion, token, useCdn: false }) : null;
