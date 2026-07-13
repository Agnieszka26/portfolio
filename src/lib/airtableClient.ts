const AIRTABLE_API = "https://api.airtable.com/v0";
const DEFAULT_TIMEOUT_MS = 10_000;

export class AirtableApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AirtableApiError";
  }
}

function getConfig(): { apiKey: string; baseId: string } {
  const apiKey = process.env.NEXT_PUBLIC_PERSONAL_ACCESS_TOKEN_SECRET?.trim();
  const baseId = process.env.NEXT_PUBLIC_API_TOKEN_BASE?.trim();

  if (!apiKey || !baseId) {
    throw new AirtableApiError("Missing Airtable credentials", 0);
  }

  return { apiKey, baseId };
}

export function escapeAirtableFormulaString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export type AirtableRecord = {
  id: string;
  fields: Record<string, unknown>;
};

type ListOptions = {
  fields?: readonly string[];
  filterByFormula?: string;
  maxRecords?: number;
};

async function airtableFetch(
  url: string,
  timeoutMs = DEFAULT_TIMEOUT_MS,
): Promise<Response> {
  const { apiKey } = getConfig();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: controller.signal,
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      let code: string | undefined;
      try {
        const body = await response.json();
        code = body?.errors?.[0]?.error;
      } catch {
        // ignore JSON parse errors on error responses
      }

      throw new AirtableApiError(
        `Airtable request failed (${response.status}${code ? `: ${code}` : ""})`,
        response.status,
        code,
      );
    }

    return response;
  } catch (error) {
    if (error instanceof AirtableApiError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new AirtableApiError(
        `Airtable request timed out after ${timeoutMs}ms`,
        408,
      );
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export async function listAllRecords(
  tableName: string,
  options: ListOptions = {},
): Promise<AirtableRecord[]> {
  const { baseId } = getConfig();
  const records: AirtableRecord[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (options.filterByFormula) {
      params.set("filterByFormula", options.filterByFormula);
    }
    if (options.maxRecords != null) {
      params.set("maxRecords", String(options.maxRecords));
    }
    options.fields?.forEach((field) => params.append("fields[]", field));
    if (offset) params.set("offset", offset);

    const url = `${AIRTABLE_API}/${baseId}/${encodeURIComponent(tableName)}?${params}`;
    const response = await airtableFetch(url);
    const data = (await response.json()) as {
      records?: { id: string; fields?: Record<string, unknown> }[];
      offset?: string;
    };

    for (const record of data.records ?? []) {
      records.push({ id: record.id, fields: record.fields ?? {} });
    }

    offset = data.offset;
  } while (offset && options.maxRecords == null);

  return records;
}
