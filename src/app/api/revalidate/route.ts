import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity webhook target: refreshes plate pages within seconds of an edit in the admin.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ message: "Revalidation is not configured" }, { status: 500 });

  const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true);
  if (!isValidSignature) return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  if (body?._type !== "plate") return NextResponse.json({ message: "Ignored" });

  revalidateTag("plates", "max");
  return NextResponse.json({ revalidated: true });
}
