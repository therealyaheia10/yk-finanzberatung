import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: Logo-Kachel (Sand, Globus, Verbindungsbogen) */
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 48 48">
        <rect x="0" y="0" width="48" height="48" rx="12" fill="#D6BE93" />
        <circle cx="24" cy="24" r="13.5" fill="none" stroke="#111519" strokeWidth="2.4" />
        <path d="M24 10.5 C 17.5 15.5, 17.5 32.5, 24 37.5 C 30.5 32.5, 30.5 15.5, 24 10.5 Z" fill="none" stroke="#111519" strokeWidth="2" />
        <path d="M10.5 24 H 37.5" stroke="#111519" strokeWidth="1.8" />
        <path d="M7 33 C 15 40, 33 40, 41 28" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    ),
    size,
  );
}
