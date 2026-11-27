import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type?: string;
};

/** Every cached post query is tagged `posts` (see `@/lib/sanity/posts`). */
const POST_CACHE_TYPES = new Set(["post", "translation.metadata"]);

/**
 * Sanity webhook target. Configure the webhook to POST on create, update
 * and delete with a projection that includes `_type`, signed with
 * `SANITY_REVALIDATE_SECRET`.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { message: "Missing SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    if (!POST_CACHE_TYPES.has(body._type)) {
      return NextResponse.json({ revalidated: false, type: body._type });
    }

    revalidateTag("posts");
    return NextResponse.json({ revalidated: true, type: body._type });
  } catch (error) {
    console.error(
      "[revalidate] Failed to handle Sanity webhook:",
      error instanceof Error ? error.message : error,
    );
    return NextResponse.json({ message: "Webhook error" }, { status: 500 });
  }
}
