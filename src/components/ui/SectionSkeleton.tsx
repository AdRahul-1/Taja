import React from "react";

interface SectionSkeletonProps {
  height?: string;
}

export default function SectionSkeleton({ height = "min-h-[70vh]" }: SectionSkeletonProps) {
  return (
    <div
      className={`w-full ${height} bg-cream-100/40 animate-pulse border-t border-gold/20 flex items-center justify-center p-8`}
      aria-hidden="true"
    >
      <div className="max-w-4xl w-full space-y-6 opacity-30">
        <div className="h-4 bg-gold-dark/40 rounded-full w-32 mx-auto" />
        <div className="h-10 bg-espresso-900/40 rounded-2xl w-3/4 mx-auto" />
        <div className="h-4 bg-espresso-700/30 rounded-full w-1/2 mx-auto" />
      </div>
    </div>
  );
}
