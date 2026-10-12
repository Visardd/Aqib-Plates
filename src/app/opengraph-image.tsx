import { ogSize, plateCard } from "@/lib/og";

export const alt = "Aqib Plates: private number plates for sale in the UK";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return plateCard({ registration: "AQIB PLATES", caption: "Private number plates for sale, DVLA paperwork handled" });
}
