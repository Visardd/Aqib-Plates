import { getPlate } from "@/lib/data";
import { formatPrice } from "@/lib/plates";
import { plateCard } from "@/lib/og";

// A stable URL for each plate's share image, used by both og:image and the Product structured data.
export async function GET(_: Request, { params }: RouteContext<"/og/plates/[slug]">) {
  const { slug } = await params;
  const plate = await getPlate(slug);
  if (!plate) return new Response("Not found", { status: 404 });

  const caption =
    plate.status === "sold"
      ? "Sold at Aqib Plates"
      : plate.price !== undefined
        ? `For sale at Aqib Plates · ${formatPrice(plate.price)}`
        : "Private number plates at Aqib Plates";

  const image = await plateCard({ registration: plate.registration, caption });
  image.headers.set("Cache-Control", "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800");
  return image;
}
