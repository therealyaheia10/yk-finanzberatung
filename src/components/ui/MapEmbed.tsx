"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/** Zwei-Klick-Karte: Google Maps wird erst nach ausdrücklichem Klick geladen (DSGVO/TDDDG). */
export function MapEmbed({ address, loadLabel, note, title, className = "" }: { address: string; loadLabel: string; note: string; title: string; className?: string }) {
  const [on, setOn] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line-dark bg-navy-soft ${className}`}>
      {on ? (
        <iframe src={src} title={title} className="h-full w-full grayscale-[35%]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">
          <svg className="absolute inset-0 h-full w-full opacity-[0.18]" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 400 220">
            <path d="M0 60 L400 40 M0 140 L400 170 M80 0 L110 220 M250 0 L220 220 M330 0 L360 220 M0 100 Q200 80 400 110" stroke="#b3b9bf" strokeWidth="2" fill="none" />
          </svg>
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-champagne-light text-navy-deep"><MapPin size={22} aria-hidden="true" /></span>
          <button type="button" onClick={() => setOn(true)} className="btn btn-ghost-light relative !min-h-11 !text-[0.95rem]" data-track="map_load">{loadLabel}</button>
          <p className="relative max-w-xs text-[0.8rem] text-mist">{note}</p>
        </div>
      )}
    </div>
  );
}
