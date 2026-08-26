"use client";
import React from "react";

export default function Loading() {
	return (
		<div className="min-h-screen w-full bg-[#18181b] flex flex-col items-center justify-center">
			<div className="flex flex-col items-center gap-4">
				<div className="relative size-16 rounded-full border-4 border-white/10 border-t-[#f59e0b] animate-spin" />
				<span className="text-2xl font-bold tracking-widest text-white/90 animate-pulse">
					TAJA
				</span>
			</div>
		</div>
	);
}