import type { SVGProps } from "react";

/** Placeholder dial mark used in place of product photography until real imagery is shot. */
export function WatchMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="50" cy="50" r="36" strokeWidth="1.25" />
      <circle cx="50" cy="50" r="30" strokeWidth="0.5" opacity="0.5" />
      {[0, 90, 180, 270].map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="16"
          x2="50"
          y2="21"
          strokeWidth="1.25"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <line x1="50" y1="50" x2="50" y2="28" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2="66" y2="50" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
