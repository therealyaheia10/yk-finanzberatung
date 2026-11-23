import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: App-Icon-Variante aus der Logo-Vorlage (Navy-Kachel, Globus, goldener Pfeil) */
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="64" height="64" viewBox="0 0 640 640">
        <rect x="0" y="0" width="640" height="640" rx="140" fill="#14213D" />
        <circle cx="315" cy="330" r="235" fill="#22396B" />
        <g fill="none" stroke="#EEF1F5" strokeOpacity=".55" strokeWidth="12">
          <line x1="315" y1="98" x2="315" y2="562" />
          <ellipse cx="315" cy="330" rx="95" ry="232" />
          <ellipse cx="315" cy="330" rx="232" ry="50" />
        </g>
        <polyline points="110,470 245,340 325,402 480,250" fill="none" stroke="#E3B341" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="560,140 438,190 532,262" fill="#E3B341" />
      </svg>
    ),
    size,
  );
}
