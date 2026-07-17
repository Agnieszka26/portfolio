import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Shared Sanity client for Server Component data fetching.
 * Env vars are validated in `@/sanity/env` (projectId, dataset required;
 * apiVersion falls back to a pinned date when unset).
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});
