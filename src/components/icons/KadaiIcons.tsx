import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Custom 6-Icon Kadai Motif Set (1.5px consistent stroke, rounded caps).
 * Custom-crafted for Taja Chanachur ($100K luxury brand identity).
 * Includes class `kadai-icon-path` on paths for GSAP stroke-dashoffset animation.
 */

// 1. Kadai / Wok Icon (Small Kadai Batches)
export function KadaiWokIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Wok Rim and Bowl */}
      <path className="kadai-icon-path" d="M3 10C3.5 16 7.5 19.5 12 19.5C16.5 19.5 20.5 16 21 10H3Z" />
      {/* Left Brass Ring Handle */}
      <path className="kadai-icon-path" d="M3 10C3 7.8 1.5 7.8 1.5 10C1.5 11.5 2.5 12 3.5 12" />
      {/* Right Brass Ring Handle */}
      <path className="kadai-icon-path" d="M21 10C21 7.8 22.5 7.8 22.5 10C22.5 11.5 21.5 12 20.5 12" />
      {/* Simmer Steam Wisps */}
      <path className="kadai-icon-path" d="M8 6.5C8.5 5 9.5 5 9.5 3.5" />
      <path className="kadai-icon-path" d="M12 7C12.5 5.5 13.5 5.5 13.5 4" />
      <path className="kadai-icon-path" d="M16 6.5C16.5 5 17.5 5 17.5 3.5" />
    </svg>
  );
}

// 2. Artisan Hand Icon (Hand-Blended Heritage)
export function KadaiHandIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Palm and Fingers contour */}
      <path
        className="kadai-icon-path"
        d="M18 11V6C18 4.9 17.1 4 16 4C14.9 4 14 4.9 14 6V11"
      />
      <path
        className="kadai-icon-path"
        d="M14 6V3.5C14 2.4 13.1 1.5 12 1.5C10.9 1.5 10 2.4 10 3.5V11"
      />
      <path
        className="kadai-icon-path"
        d="M10 5.5V4C10 2.9 9.1 2 8 2C6.9 2 6 2.9 6 4V13"
      />
      <path
        className="kadai-icon-path"
        d="M6 10.5C6 9.4 5.1 8.5 4 8.5C2.9 8.5 2 9.4 2 10.5V15C2 19 5.5 22 10 22C14.5 22 18 19 18 15V11"
      />
      {/* Spice sprinkling dots */}
      <path className="kadai-icon-path" d="M21 5H21.01" />
      <path className="kadai-icon-path" d="M22 8H22.01" />
      <path className="kadai-icon-path" d="M20 11H20.01" />
    </svg>
  );
}

// 3. Flame Icon (Hearth Fire Roasting)
export function KadaiFlameIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Outer Hearth Flame */}
      <path
        className="kadai-icon-path"
        d="M12 2C9.5 5.5 6 8.5 6 13.5C6 17.5 8.7 21 12 21C15.3 21 18 17.5 18 13.5C18 9 14.5 5 12 2Z"
      />
      {/* Inner Hearth Core */}
      <path
        className="kadai-icon-path"
        d="M12 11C10.5 13 9.5 14.5 9.5 16.5C9.5 18.2 10.6 19.5 12 19.5C13.4 19.5 14.5 18.2 14.5 16.5C14.5 14.5 13.5 13 12 11Z"
      />
    </svg>
  );
}

// 4. Pure Spice Leaf Icon (Cold-Pressed & Natural Botanicals)
export function KadaiLeafIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Leaf Contour */}
      <path
        className="kadai-icon-path"
        d="M21 3C14 3 6 7 4 14C3 17.5 4.5 20.5 7.5 21C14.5 22 19 14 21 3Z"
      />
      {/* Central Leaf Vein */}
      <path className="kadai-icon-path" d="M4 21C7.5 18 12.5 14 21 3" />
      {/* Side Veins */}
      <path className="kadai-icon-path" d="M10 16L14 17" />
      <path className="kadai-icon-path" d="M14 12L18 13" />
    </svg>
  );
}

// 5. Sealed Pack Icon (Airtight Nitrogen Freshness Lock)
export function KadaiPackIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Pouch Silhouette */}
      <path
        className="kadai-icon-path"
        d="M6 3H18L19.5 7V19.5C19.5 20.9 18.4 22 17 22H7C5.6 22 4.5 20.9 4.5 19.5V7L6 3Z"
      />
      {/* Pouch Top Seal Crimp */}
      <path className="kadai-icon-path" d="M4.5 7H19.5" />
      {/* Center Quality Seal Emblem */}
      <circle className="kadai-icon-path" cx="12" cy="14" r="3.5" />
      <path className="kadai-icon-path" d="M10.5 14L11.5 15L13.5 13" />
    </svg>
  );
}

// 6. Chai Cup Icon (The Classic Evening Tea Companion)
export function KadaiChaiIcon({ className = "w-6 h-6", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Classic Fluted Clay Cup / Tea Glass */}
      <path
        className="kadai-icon-path"
        d="M5 6H19L17.5 18C17.3 19.7 15.8 21 14.1 21H9.9C8.2 21 6.7 19.7 6.5 18L5 6Z"
      />
      {/* Cup Rim */}
      <path className="kadai-icon-path" d="M4 6H20" />
      {/* Fluted Vertical Ridges */}
      <path className="kadai-icon-path" d="M9 9L9.5 17" />
      <path className="kadai-icon-path" d="M12 9V17" />
      <path className="kadai-icon-path" d="M15 9L14.5 17" />
      {/* Tea Steam Swirl */}
      <path className="kadai-icon-path" d="M10 3C10.5 2 11.5 2 11.5 1" />
      <path className="kadai-icon-path" d="M14 3C14.5 2 15.5 2 15.5 1" />
    </svg>
  );
}
