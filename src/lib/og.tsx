import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { plateBand, plateText } from "./plate-font";

export const ogSize = { width: 1200, height: 630 };

/** Shared social card: a big UK plate on the dark canvas with a caption. */
export async function plateCard({ registration, caption }: { registration: string; caption: string }) {
  const [plateFont, interFont] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/uk-number-plate.ttf")),
    // A static SemiBold cut of the site's Inter, since share images can't use variable WOFF2.
    readFile(join(process.cwd(), "src/fonts/inter-semibold-og.ttf")),
  ]);
  const plateWidth = 960;
  const reg = plateText(registration, { width: plateWidth, band: true });

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
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            width: plateWidth,
            height: Math.round((plateWidth * 111) / 520),
            borderRadius: 22,
            background: "#fdd000",
            overflow: "hidden",
            boxShadow: "0 30px 80px -20px rgba(253,208,0,0.45)",
          }}
        >
          <div
            style={{
              width: Math.round(plateWidth * plateBand),
              background: "#0b3b9c",
              color: "white",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 20,
              fontSize: 34,
              fontWeight: 600,
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
              gap: reg.groupGap,
              fontFamily: "Plate",
              fontSize: reg.fontSize,
              lineHeight: 1,
              letterSpacing: reg.letterSpacing,
              color: "#0b0b0b",
              transform: `translateX(${reg.offset}px)`,
            }}
          >
            {/* Satori has no word-spacing, so each group is its own box with the legal gap between. */}
            {reg.text.split(/\s+/).map((group, i) => (
              <span key={i}>{group}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 40, letterSpacing: -1, color: "#f7f8f8" }}>{caption}</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: interFont, weight: 600, style: "normal" },
        { name: "Plate", data: plateFont, weight: 400, style: "normal" },
      ],
    },
  );
}
