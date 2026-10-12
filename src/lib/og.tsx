import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Shared social card: a big UK plate on the dark canvas with a caption. */
export async function plateCard({ registration, caption }: { registration: string; caption: string }) {
  const plateFont = await readFile(join(process.cwd(), "src/fonts/plate.woff"));
  const fontSize = Math.min(150, 1150 / Math.max(registration.length, 7));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          background: "radial-gradient(60% 60% at 50% 40%, rgba(253,208,0,0.16), #08090a 70%)",
          backgroundColor: "#08090a",
          color: "#f7f8f8",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 960,
            height: 205,
            borderRadius: 22,
            background: "#fdd000",
            overflow: "hidden",
            boxShadow: "0 30px 80px -20px rgba(253,208,0,0.45)",
          }}
        >
          <div
            style={{
              width: 82,
              background: "#0b3b9c",
              color: "white",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 20,
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            UK
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Plate",
              fontSize,
              color: "#0b0b0b",
              whiteSpace: "pre",
            }}
          >
            {registration.toUpperCase()}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -1, color: "#f7f8f8" }}>{caption}</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Plate", data: plateFont, weight: 600, style: "normal" }] },
  );
}
