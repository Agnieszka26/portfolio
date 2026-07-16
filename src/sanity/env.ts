export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-07-14'

export const dataset = assertValue(
  cleanEnv(process.env.NEXT_PUBLIC_SANITY_DATASET),
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  cleanEnv(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID),
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

/** Strip accidental quotes/whitespace from .env values. */
function cleanEnv(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  return value.trim().replace(/^['"]|['"]$/g, '')
}

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
