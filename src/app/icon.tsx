import { ImageResponse } from "next/og";
import { advisor } from "@/config/advisor";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon wird automatisch aus den Initialen der Konfiguration erzeugt */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 64, height: 64, background: "#102A43", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 54, height: 54, border: "1.5px solid #C9B286", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 26, fontWeight: 700, letterSpacing: 1 }}>
          {advisor.initials}
        </div>
      </div>
    ),
    size,
  );
}
