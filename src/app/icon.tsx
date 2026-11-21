import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: Globus-Bildmarke der Marke */
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: 64, height: 64, background: "#102A43", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
        <svg width="50" height="50" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" fill="none" stroke="#FFFFFF" strokeWidth="2.2" />
          <ellipse cx="24" cy="24" rx="9.5" ry="21" fill="none" stroke="#FFFFFF" strokeWidth="1.6" />
          <line x1="3" y1="24" x2="45" y2="24" stroke="#FFFFFF" strokeWidth="1.6" />
          <path d="M8 31 C 14 41, 34 43, 43 27" fill="none" stroke="#C9B286" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
