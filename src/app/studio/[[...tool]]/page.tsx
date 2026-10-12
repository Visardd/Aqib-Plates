import { Suspense } from "react";
import { connection } from "next/server";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { viewport } from "next-sanity/studio";

export const metadata = {
  title: "Plate admin",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return [{ tool: [] }];
}

// The admin is rendered on request rather than prerendered; this marks it as intentionally dynamic.
async function RequestTimeMarker() {
  await connection();
  return null;
}

export default function StudioPage() {
  return (
    <>
      <NextStudio config={config} />
      <Suspense>
        <RequestTimeMarker />
      </Suspense>
    </>
  );
}
