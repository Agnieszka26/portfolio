import type { RemoteCoverImage } from "@/types";

function asAttachmentList(raw: unknown): Record<string, unknown>[] {
  if (Array.isArray(raw)) return raw as Record<string, unknown>[];
  if (raw != null && typeof raw === "object") return [raw as Record<string, unknown>];
  return [];
}

/**
 * First image URL + dimensions from an Airtable attachment field (single or multiple attachments).
 */
export function remoteCoverFromField(raw: unknown): RemoteCoverImage | null {
  const list = asAttachmentList(raw);
  const first = list[0];
  if (!first) return null;

  const thumbnails = first.thumbnails as Record<string, { url?: string; width?: number; height?: number }> | undefined;
  const url =
    (thumbnails?.large?.url as string | undefined) ??
    (thumbnails?.full?.url as string | undefined) ??
    (thumbnails?.small?.url as string | undefined) ??
    (first.url as string | undefined);
  if (!url) return null;

  const width =
    (first.width as number | undefined) ??
    thumbnails?.large?.width ??
    thumbnails?.full?.width ??
    800;
  const height =
    (first.height as number | undefined) ??
    thumbnails?.large?.height ??
    thumbnails?.full?.height ??
    800;

  return { url, width, height };
}
